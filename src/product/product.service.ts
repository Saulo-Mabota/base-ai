/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Product } from './schema/product.model.schema';
import { QueryProductDto } from './dto/query-product.dto';
import { UserModel } from 'src/users/model';
import { ObjectId } from 'mongodb';
import { StockHasProduct } from 'src/stockHasProduct/schema/stockHasProduct.model.schema';
import { Stock } from 'src/stock/schema/stock.model.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Product.name) private product: Model<Product>,
    @InjectModel(StockHasProduct.name)
    private stockHasProduct: Model<StockHasProduct>,
    @InjectModel(Stock.name)
    private stock: Model<Stock>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getProduct(id: string) {
    const entity = await this.prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!entity) {
      throw new Error('product not found');
    }
    return entity;
  }

  async getProducts(user: UserModel, options: QueryProductDto = {}) {
    const { role } = user;
    const { skip, take, search } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          categoryId: { contains: search },
        },
        {
          name: { contains: search },
        },
      ];
    }
    if (role.name !== 'Admin') {
      where = { ...baseWhere, entityId: user.role.department.entityId };
    } else {
      where = { ...baseWhere };
    }
    const total = await this.prisma.product.count({ where: where });
    const product = await this.prisma.product.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        cover: true,
        price: true,
        quantity: true,
        subCategory: true,
        ingredients: {
          select: {
            id: true,
            stockId: true,
            quantity: true,
            unity_type: true,
            product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!product) {
      throw new Error('products not found');
    }
    // console.log(product[0].ingredients);

    return { product, total };
  }

  // async createProduct(createProductDto: CreateProductDto, entityId: string) {
  //   try {
  //     console.log('createProductDto', createProductDto);

  //     const product = await this.product.create({
  //       ...createProductDto,
  //       entityId,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //     product.id = product._id;
  //     delete product._id;
  //     return product;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async createProduct(createProductDto: CreateProductDto, entityId: string) {
    try {
      if (createProductDto.id) {
        const existingProduct = await this.prisma.product.findUnique({
          where: { id: createProductDto.id },
        });

        if (existingProduct) {
          const id = new ObjectId(createProductDto.id);

          const ingredients = JSON.parse(`${createProductDto.ingredients}`).map(
            (item) => {
              return {
                stockId: item.stockId,
                quantity: item.quantity,
              };
            },
          );

          // console.log(ingredients);

          // return;
          // console.log(createProductDto);

          const updatedProduct = await this.product.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                ...createProductDto,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          if (ingredients.length) {
            this.addIngrediente(updatedProduct.id, ingredients);
          }
          return updatedProduct;
        }
      } else {
        const product = await this.product.create({
          ...createProductDto,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        product.id = product._id;
        // console.log(createProductDto.ingredients);

        if (createProductDto.ingredients) {
          this.addIngrediente(product.id, createProductDto.ingredients);
        }
        delete product._id;
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async addIngrediente(producId: string, ingredientsData = []) {
    const ingredients = ingredientsData.map((ingredient) => {
      return {
        ...ingredient,
        productId: producId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // console.log(ingredients);

    try {
      const ingredient = await this.stockHasProduct.create(ingredients);
      ingredient.map(async (item) => {
        const existingStock = await this.prisma.stock.findUnique({
          where: { id: item.stockId },
        });
        const id = new ObjectId(existingStock.id);
        const result = existingStock.quantity - item.quantity;

        if (result > 0) {
          // console.log('result', result);
          await this.stock.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                quantity: result,
                isActive: result ? true : false,
                isAvailable: result ? true : false,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          // console.log('stkUpdate', stkUpdate);

          if (item.stockId) {
            const product = await this.stock.create({
              ...existingStock,
              stockId: existingStock.id,
              quantity: item.quantity,
              action: 'Removed',
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            product.id = product._id;
            delete product._id;
            return product;
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async removeIngrediente(ingredientId) {
    // console.log("ingredientId",ingredientId);
    
    const existingIngredient = await this.prisma.stockHasProduct.findUnique({
      where: { id: ingredientId },
    });

    try {
      if (existingIngredient.id) {
        const idI = existingIngredient.id;
        const delIngeredient = await this.stockHasProduct.findByIdAndDelete(
          idI,
        );

        const existingStock = await this.prisma.stock.findUnique({
          where: { id: existingIngredient.stockId },
        });

        const id = new ObjectId(existingStock.id);
        const result = existingStock.quantity + existingIngredient.quantity;

        if (result > 0) {
          // console.log('result', result);
          await this.stock.findByIdAndUpdate(
            id, // Passa o ID diretamente
            {
              $set: {
                quantity: result,
                isActive: result ? true : false,
                isAvailable: result ? true : false,
                updatedAt: new Date(),
              },
            },
            { new: true }, // Retorna o documento atualizado
          );
          // console.log('stkUpdate', stkUpdate);

          if (delIngeredient.stockId) {
            const product = await this.stock.create({
              ...existingStock,
              stockId: existingStock.id,
              quantity: delIngeredient.quantity,
              action: 'Returned',
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            product.id = product._id;
            delete product._id;
            return product;
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      if (id) {
        const existingProduct = await this.prisma.product.findUnique({
          where: { id },
        });

        if (existingProduct) {
          const deleteProduct = await this.product.findByIdAndDelete(
            id, // Passa o ID diretamente
          );

          return deleteProduct;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
