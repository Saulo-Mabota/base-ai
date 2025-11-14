/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DiscoveryService } from '@nestjs/core';
import { Order } from './schema/order.model.schema';
import { OrderItem } from './schema/orderItem.model.schema';
import { UserModel } from 'src/users/model';
import { QueryUserDto } from './dto/query-user.dto';
import { ObjectId } from 'mongodb'; // Importa ObjectId
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(OrderItem.name) private orderItem: Model<OrderItem>,
    private readonly discoveryService: DiscoveryService,
  ) {}

  async getOrder(id: string) {
    const entity = await this.prisma.order.findFirst({
      where: {
        ref:id
      },
      select: {
      id: true,
        customer: true,
        isPayed: true,
        createdAt: true,
        typeOrder: true,
        ref: true,
        total_price: true,
        userId: true,
        departmentId: true,
        user: true,
        status: true,
        entity: {
          select: {
            name: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            description: true,
            createdAt: true,
            product: {
              include: {
                subCategory: {
                  select: {
                    category: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            unit_price: true,
            quantity: true,
          },
        },
      },
    });
    if (!entity) {
      throw new Error('order not found');
    }
    return entity;
  }

  // async getOrders() {
  //   const order = await this.prisma.order.findMany({
  //     select: {
  //       id: true,
  //       isPayed: true,
  //     },
  //   });
  //   if (!order) {
  //     throw new Error('orders not found');
  //   }
  //   return order;
  // }

  async getOrders(user: UserModel, options: QueryUserDto = {}) {
    const { role } = user;
    const { skip, take, search, typeOrder, status } = options;
    const baseWhere: any = {};
    let where = { ...baseWhere };
    if (search) {
      baseWhere.OR = [
        {
          ref: { contains: search },
        },
        {
          customer: {
            firstName: { contains: search }, // Busca pelo campo firstName
          },
        },
      ];
    }
    if (status) {
      baseWhere.OR = [
        {
          status: { contains: status },
        },
        {
          typeOrder: { contains: typeOrder },
        },
      ];
    }
    if (typeOrder) {
      baseWhere.OR = [
        {
          typeOrder: { contains: typeOrder },
        },
      ];
    }

    if (search && typeOrder && status) {
      baseWhere.OR = [
        // {
        //   customer: {
        //     firstName: { contains: search }, // Busca pelo campo firstName
        //   },
        // },
        {
          status: { contains: status },
        },
        {
          ref: { contains: search },
        },
        {
          typeOrder: { contains: typeOrder },
        },
      ];
    }

    if (role.name !== 'Admin') {
      where = {
        ...baseWhere,
        userId: user.id,
        entityId: user.role.department.entityId,
      };
    } else {
      where = { ...baseWhere };
      // console.log(where);
    }
    const total = await this.prisma.order.count({ where: where });
    const orders = await this.prisma.order.findMany({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      where: where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        customer: true,
        isPayed: true,
        createdAt: true,
        typeOrder: true,
        ref: true,
        total_price: true,
        userId: true,
        departmentId: true,
        user: true,
        status: true,
        entity: {
          select: {
            name: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            description: true,
            createdAt: true,
            product: {
              include: {
                subCategory: {
                  select: {
                    category: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            unit_price: true,
            quantity: true,
          },
        },
      },
    });
    if (!orders) {
      throw new Error('User not found');
    }
    return { orders, total };
  }

  async createOrder(createOrderDto: CreateOrderDto, user: UserModel) {
    try {
      // console.log("createOrderDto",createOrderDto);
      const checkOrder = await this.order.findOneAndDelete({
        ref: createOrderDto.ref,
      });
      if (checkOrder) {
        await this.orderItem.deleteMany({ orderId: checkOrder._id });
        // console.log(checkOrder);
      }

      const order = await this.order.create({
        entityId: user.role.department.entityId,
        departmentId: user.role.departmentId,
        customerId: createOrderDto.customerId,
        isPayed: createOrderDto.isPayed,
        ref: createOrderDto.ref,
        status: 'pending',
        userId: user.id,
        total_price: createOrderDto.orderItems.reduce(
          (total, item) => total + item.quantity * item.unit_price,
          0,
        ),
        typeOrder: createOrderDto.typeOrder,
        // description: createOrderDto.description
        createdAt: checkOrder ? checkOrder.createdAt : new Date(),
        updatedAt: new Date(),
      });
      order.id = order._id;
      const createOrderItemDto = createOrderDto.orderItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          description: item.description,
          unit_price: item.unit_price,
          orderId: order.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      await this.orderItem.insertMany(createOrderItemDto);
      delete order._id;
      const orderData = await this.prisma.order.findFirst({
        where: { id: order.id },
        select: {
          id: true,
          customer: true,
          isPayed: true,
          createdAt: true,
          ref: true,
          total_price: true,
          orderItems: {
            select: {
              id: true,
              description: true,
              createdAt: true,
              product: true,
              unit_price: true,
              quantity: true,
            },
          },
        },
      });
      return orderData;
    } catch (error) {
      throw error;
    }
  }

  async editOrder(updateOrderDto: UpdateOrderDto) {
    try {
      // console.log(updateOrderDto);

      if (updateOrderDto.id) {
        // const id = new ObjectId(updateOrderDto.id);
        const existingOrder = await this.prisma.order.findUnique({
          where: { id: updateOrderDto.id },
        });
        // console.log(existingOrder);

        if (existingOrder) {
          const order = await this.order.findByIdAndUpdate(existingOrder.id, {
            ...updateOrderDto,
            updatedAt: new Date(),
          });
          return order;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(id: string) {
    try {
      if (id) {
        // Verifica se a ordem existe
        const existingOrder = await this.prisma.order.findUnique({
          where: { id },
        });

        if (existingOrder) {
          await this.orderItem.deleteMany({ orderId: id });
          const deleteOrder = await this.order.findByIdAndDelete(
            id, // Passa o ID diretamente
          );
          return deleteOrder;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  
  async deleteOrderItem(id: string) {
    try {
      if (id) {
        // Verifica se a ordemItem existe
        const existingOrder = await this.prisma.orderItem.findUnique({
          where: { id },
        });

        if (existingOrder) {
          const deleteOrderItem = await this.orderItem.findByIdAndDelete(
            id, // Passa o ID diretamente
          );
          const totalUpdated = await this.prisma.orderItem.findMany({
            where: { orderId: deleteOrderItem.orderId },
          });

          console.log(totalUpdated);
          if (totalUpdated) {
            await this.order.findByIdAndUpdate(deleteOrderItem.orderId, {
              total_price: totalUpdated.reduce(
                (total, item) => total + item.quantity * item.unit_price,
                0,
              ),
            });
          }
          return deleteOrderItem;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
