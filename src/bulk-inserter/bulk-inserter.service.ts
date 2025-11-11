/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from '../stock/schema/stock.model.schema';
import { Category } from '../category/schema/category.model.schema';
import { Product } from '../product/schema/product.model.schema';
import { SubCategory } from '../subcategory/schema/subCategory.model.schema';
import { StockHasProduct } from '../stockHasProduct/schema/stockHasProduct.model.schema';

@Injectable()
export class BulkInserterService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>,
    @InjectModel(StockHasProduct.name) private stockHasProductModel: Model<StockHasProduct>,
  ) {}

  /**
   * Inserts dummy categories for both ingredients and menu items
   * @param entityId - The ID of the entity to associate with the categories
   */
  async insertCategories(entityId: string): Promise<{[key: string]: string}> {
    console.log('A inserir categorias para a entidade:', entityId);

    const ingredientCategories = [
      { name: 'Carne e Aves', description: 'Todos os ingredientes de carne e aves', type: 'ingredient' },
      { name: 'Marisco', description: 'Ingredientes de peixe e marisco', type: 'ingredient' },
      { name: 'Vegetais', description: 'Vegetais frescos', type: 'ingredient' },
      { name: 'Frutas', description: 'Frutas frescas', type: 'ingredient' },
      { name: 'Lacticínios', description: 'Leite, queijo e outros produtos lácteos', type: 'ingredient' },
      { name: 'Cereais e Massas', description: 'Arroz, massa e outros cereais', type: 'ingredient' },
      { name: 'Especiarias e Ervas', description: 'Ervas, especiarias e temperos', type: 'ingredient' },
      { name: 'Óleos e Condimentos', description: 'Óleos de cozinha e condimentos', type: 'ingredient' },
      { name: 'Bebidas', description: 'Ingredientes para bebidas', type: 'ingredient' },
      { name: 'Tubérculos', description: 'Batata-doce, mandioca, inhame', type: 'ingredient' },
      { name: 'Feijões e Leguminosas', description: 'Vários tipos de feijões e leguminosas secas', type: 'ingredient' },
      { name: 'Nozes e Sementes', description: 'Amendoins, castanhas de caju, sementes de abóbora', type: 'ingredient' },
    ];

    const menuCategories = [
      { name: 'Entradas', description: 'Aperitivos e petiscos', type: 'food' },
      { name: 'Pratos Principais', description: 'Pratos principais', type: 'food' },
      { name: 'Saladas', description: 'Saladas frescas', type: 'food' },
      { name: 'Sopas', description: 'Sopas quentes e frias', type: 'food' },
      { name: 'Sobremesas', description: 'Doces e guloseimas', type: 'food' },
      { name: 'Bebidas', description: 'Bebidas e refrescos', type: 'food' },
      { name: 'Acompanhamentos', description: 'Pratos de acompanhamento', type: 'food' },
      { name: 'Pratos Típicos', description: 'Pratos tradicionais moçambicanos', type: 'food' },
    ];

    const categoryIds = {};
    for (const category of [...ingredientCategories, ...menuCategories]) {
      try {
        const newCategory = await this.categoryModel.create({
          ...category,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        newCategory.id = newCategory._id;
        categoryIds[category.name] = newCategory.id;
        console.log(`Categoria criada: ${category.name} com ID: ${newCategory.id}`);
      } catch (error) {
        console.error(`Erro ao criar a categoria ${category.name}:`, error.message);
      }
    }
    return categoryIds;
  }

  /**
   * Inserts dummy subcategories for menu items
   * @param entityId - The ID of the entity
   * @param categoryIds - Map of category names to their IDs
   */
  async insertSubCategories(entityId: string, categoryIds: {[key: string]: string}): Promise<{[key: string]: string}> {
    console.log('A inserir subcategorias para a entidade:', entityId);

    const subCategories = [
      { name: 'Pasta Dishes', description: 'Italian pasta dishes', categoryId: categoryIds['Main Courses'] },
      { name: 'Steaks', description: 'Premium steak dishes', categoryId: categoryIds['Main Courses'] },
      { name: 'Seafood Dishes', description: 'Fresh seafood dishes', categoryId: categoryIds['Main Courses'] },
      { name: 'Vegetarian', description: 'Vegetarian main courses', categoryId: categoryIds['Main Courses'] },
      { name: 'Chicken Dishes', description: 'Chicken-based dishes', categoryId: categoryIds['Main Courses'] },
      
      { name: 'Hot Appetizers', description: 'Warm starters', categoryId: categoryIds['Appetizers'] },
      { name: 'Cold Appetizers', description: 'Cold starters', categoryId: categoryIds['Appetizers'] },
      
      { name: 'Cakes', description: 'Various cakes', categoryId: categoryIds['Desserts'] },
      { name: 'Ice Cream', description: 'Ice cream and gelato', categoryId: categoryIds['Desserts'] },
      { name: 'Fruit Desserts', description: 'Fruit-based desserts', categoryId: categoryIds['Desserts'] },
      
      { name: 'Alcoholic', description: 'Alcoholic beverages', categoryId: categoryIds['Beverages'] },
      { name: 'Non-Alcoholic', description: 'Non-alcoholic beverages', categoryId: categoryIds['Beverages'] },
      { name: 'Hot Drinks', description: 'Coffee, tea, and other hot drinks', categoryId: categoryIds['Beverages'] },
      { name: 'Pratos de Feijão', description: 'Pratos à base de feijão', categoryId: categoryIds['Pratos Típicos'] },
      { name: 'Pratos de Mandioca', description: 'Pratos à base de mandioca', categoryId: categoryIds['Pratos Típicos'] },
    ];

    const subCategoryIds = {};
    for (const subCategory of subCategories) {
      try {
        const newSubCategory = await this.subCategoryModel.create({
          ...subCategory,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        newSubCategory.id = newSubCategory._id;
        subCategoryIds[subCategory.name] = newSubCategory.id;
        console.log(`Subcategoria criada: ${subCategory.name} com ID: ${newSubCategory.id}`);
      } catch (error) {
        console.error(`Erro ao criar a subcategoria ${subCategory.name}:`, error.message);
      }
    }
    return subCategoryIds;
  }

  /**
   * Inserts dummy ingredients (stock items)
   * @param entityId - The ID of the entity
   * @param departmentId - The ID of the department (kitchen, etc.)
   * @param categoryIds - Map of category names to their IDs
   */
  async insertIngredients(entityId: string, departmentId: string, categoryIds: {[key: string]: string}): Promise<{[key: string]: string}> {
    console.log('A inserir ingredientes para a entidade:', entityId, 'e departamento:', departmentId);

    const ingredients = [
      { name: 'Peito de Frango', description: 'Peito de frango desossado', unity_type: 'kg', quantity: 50, unit_price: 550.00, categoryId: categoryIds['Carne e Aves'] },
      { name: 'Camarão', description: 'Camarão fresco', unity_type: 'kg', quantity: 20, unit_price: 1200.00, categoryId: categoryIds['Marisco'] },
      { name: 'Tomates', description: 'Tomates frescos', unity_type: 'kg', quantity: 60, unit_price: 150.00, categoryId: categoryIds['Vegetais'] },
      { name: 'Mandioca', description: 'Mandioca fresca', unity_type: 'kg', quantity: 40, unit_price: 100.00, categoryId: categoryIds['Tubérculos'] },
      { name: 'Queijo Mozzarella', description: 'Queijo fresco', unity_type: 'kg', quantity: 25, unit_price: 600.00, categoryId: categoryIds['Lacticínios'] },
      { name: 'Feijão Nhemba', description: 'Feijão típico moçambicano', unity_type: 'kg', quantity: 50, unit_price: 200.00, categoryId: categoryIds['Feijões e Leguminosas'] },
      { name: 'Castanha de Caju', description: 'Castanha de caju torrada', unity_type: 'kg', quantity: 30, unit_price: 800.00, categoryId: categoryIds['Nozes e Sementes'] },
      { name: 'Farinha de Mandioca', description: 'Farinha feita de mandioca seca', unity_type: 'kg', quantity: 40, unit_price: 150.00, categoryId: categoryIds['Tubérculos'] },
    ];

    const ingredientIds = {};
    for (const ingredient of ingredients) {
      try {
        const newIngredient = await this.stockModel.create({
          ...ingredient,
          departmentId,
          entityId,
          isActive: true,
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        newIngredient.id = newIngredient._id;
        ingredientIds[ingredient.name] = newIngredient.id;
        console.log(`Ingrediente criado: ${ingredient.name} com ID: ${newIngredient.id}`);
      } catch (error) {
        console.error(`Erro ao criar o ingrediente ${ingredient.name}:`, error.message);
      }
    }
    return ingredientIds;
  }

  /**
   * Inserts dummy menu products
   * @param entityId - The ID of the entity
   * @param subCategoryIds - Map of subcategory names to their IDs
   */
  async insertProducts(entityId: string, subCategoryIds: {[key: string]: string}): Promise<{[key: string]: string}> {
    console.log('Inserting products for entity:', entityId);
    
    const products = [
      // Pasta Dishes
      {
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy egg sauce, pancetta, and parmesan',
        subCategoryId: subCategoryIds['Pasta Dishes'],
      },
      {
        name: 'Fettuccine Alfredo',
        description: 'Fettuccine pasta in a rich creamy parmesan sauce',
        subCategoryId: subCategoryIds['Pasta Dishes'],
      },
      
      // Steaks
      {
        name: 'Filet Mignon',
        description: '8oz premium beef tenderloin with truffle butter',
        subCategoryId: subCategoryIds['Steaks'],
      },
      {
        name: 'Ribeye Steak',
        description: '12oz marbled ribeye steak with garlic herb butter',
        subCategoryId: subCategoryIds['Steaks'],
      },
      
      // Seafood Dishes
      {
        name: 'Grilled Salmon',
        description: 'Atlantic salmon fillet with lemon dill sauce',
        subCategoryId: subCategoryIds['Seafood Dishes'],
      },
      {
        name: 'Shrimp Scampi',
        description: 'Garlic butter shrimp served over linguine',
        subCategoryId: subCategoryIds['Seafood Dishes'],
      },
      
      // Vegetarian
      {
        name: 'Vegetable Stir Fry',
        description: 'Fresh vegetables stir-fried with tofu in a savory sauce',
        subCategoryId: subCategoryIds['Vegetarian'],
      },
      {
        name: 'Eggplant Parmesan',
        description: 'Breaded eggplant with marinara sauce and mozzarella',
        subCategoryId: subCategoryIds['Vegetarian'],
      },
      
      // Appetizers
      {
        name: 'Bruschetta',
        description: 'Toasted baguette topped with diced tomatoes, basil, and garlic',
        subCategoryId: subCategoryIds['Cold Appetizers'],
      },
      {
        name: 'Mozzarella Sticks',
        description: 'Breaded mozzarella sticks with marinara sauce',
        subCategoryId: subCategoryIds['Hot Appetizers'],
      },
      
      // Desserts
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
        subCategoryId: subCategoryIds['Cakes'],
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
        subCategoryId: subCategoryIds['Cakes'],
      },
      
      // Beverages
      {
        name: 'House Red Wine',
        description: 'Glass of our house Cabernet Sauvignon',
        subCategoryId: subCategoryIds['Alcoholic'],
      },
      {
        name: 'Fresh Lemonade',
        description: 'Homemade lemonade with fresh lemons and mint',
        subCategoryId: subCategoryIds['Non-Alcoholic'],
      },
    ];
    
    const productIds = {};
    
    for (const product of products) {
      try {
        const newProduct = await this.productModel.create({
          ...product,
          entityId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        newProduct.id = newProduct._id;
        productIds[product.name] = newProduct.id;
        console.log(`Created product: ${product.name} with ID: ${newProduct.id}`);
      } catch (error) {
        console.error(`Error creating product ${product.name}:`, error.message);
      }
    }
    
    return productIds;
  }

  /**
   * Links ingredients to products (creates recipes)
   * @param ingredientIds - Map of ingredient names to their IDs
   * @param productIds - Map of product names to their IDs
   */
  async linkIngredientsToProducts(ingredientIds: {[key: string]: string}, productIds: {[key: string]: string}) {
    console.log('Linking ingredients to products');
    
    // Define recipes (which ingredients go with which products and in what quantities)
    const recipes = [
      // Spaghetti Carbonara
      {
        productId: productIds['Spaghetti Carbonara'],
        ingredients: [
          { ingredientId: ingredientIds['Spaghetti'], quantity: 1, unity_type: 'kg' },
          { ingredientId: ingredientIds['Heavy Cream'], quantity: 0.5, unity_type: 'l' },
          { ingredientId: ingredientIds['Black Pepper'], quantity: 0.05, unity_type: 'kg' },
        ]
      },
      
      // Fettuccine Alfredo
      {
        productId: productIds['Fettuccine Alfredo'],
        ingredients: [
          { ingredientId: ingredientIds['Spaghetti'], quantity: 1, unity_type: 'kg' }, // Using spaghetti as a substitute for fettuccine
          { ingredientId: ingredientIds['Heavy Cream'], quantity: 0.75, unity_type: 'l' },
          { ingredientId: ingredientIds['Butter'], quantity: 0.2, unity_type: 'kg' },
        ]
      },
      
      // Filet Mignon
      {
        productId: productIds['Filet Mignon'],
        ingredients: [
          { ingredientId: ingredientIds['Ground Beef'], quantity: 0.25, unity_type: 'kg' }, // Using ground beef as a substitute
          { ingredientId: ingredientIds['Butter'], quantity: 0.05, unity_type: 'kg' },
          { ingredientId: ingredientIds['Black Pepper'], quantity: 0.01, unity_type: 'kg' },
        ]
      },
      
      // Grilled Salmon
      {
        productId: productIds['Grilled Salmon'],
        ingredients: [
          { ingredientId: ingredientIds['Salmon Fillet'], quantity: 0.2, unity_type: 'kg' },
          { ingredientId: ingredientIds['Olive Oil'], quantity: 0.03, unity_type: 'l' },
          { ingredientId: ingredientIds['Basil'], quantity: 0.01, unity_type: 'kg' },
        ]
      },
      
      // Vegetable Stir Fry
      {
        productId: productIds['Vegetable Stir Fry'],
        ingredients: [
          { ingredientId: ingredientIds['Bell Peppers'], quantity: 0.1, unity_type: 'kg' },
          { ingredientId: ingredientIds['Onions'], quantity: 0.1, unity_type: 'kg' },
          { ingredientId: ingredientIds['Olive Oil'], quantity: 0.05, unity_type: 'l' },
        ]
      },
      
      // Bruschetta
      {
        productId: productIds['Bruschetta'],
        ingredients: [
          { ingredientId: ingredientIds['Tomatoes'], quantity: 0.2, unity_type: 'kg' },
          { ingredientId: ingredientIds['Basil'], quantity: 0.02, unity_type: 'kg' },
          { ingredientId: ingredientIds['Olive Oil'], quantity: 0.03, unity_type: 'l' },
        ]
      },
      
      // Tiramisu
      {
        productId: productIds['Tiramisu'],
        ingredients: [
          { ingredientId: ingredientIds['Heavy Cream'], quantity: 0.2, unity_type: 'l' },
        ]
      },
    ];
    
    for (const recipe of recipes) {
      try {
        for (const ingredient of recipe.ingredients) {
          await this.stockHasProductModel.create({
            productId: recipe.productId,
            stockId: ingredient.ingredientId,
            quantity: Math.round(ingredient.quantity * 100), // Convert to integer (e.g., 0.5kg = 50)
            unity_type: ingredient.unity_type,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        console.log(`Created recipe for product ID: ${recipe.productId}`);
      } catch (error) {
        console.error(`Error creating recipe for product ID ${recipe.productId}:`, error.message);
      }
    }
  }

  /**
   * Main method to insert all dummy data
   * @param entityId - The ID of the entity
   * @param departmentId - The ID of the department (kitchen, etc.)
   */
  async insertAllDummyData(entityId: string, departmentId: string) {
    console.log('Starting bulk insert of dummy data...');
    
    // Step 1: Insert categories
    const categoryIds = await this.insertCategories(entityId);
    
    // Step 2: Insert subcategories
    const subCategoryIds = await this.insertSubCategories(entityId, categoryIds);
    
    // Step 3: Insert ingredients
    const ingredientIds = await this.insertIngredients(entityId, departmentId, categoryIds);
    
    // Step 4: Insert products
    const productIds = await this.insertProducts(entityId, subCategoryIds);
    
    // Step 5: Link ingredients to products (create recipes)
    await this.linkIngredientsToProducts(ingredientIds, productIds);
    
    console.log('Bulk insert of dummy data completed successfully!');
    
    return {
      categoriesCount: Object.keys(categoryIds).length,
      subCategoriesCount: Object.keys(subCategoryIds).length,
      ingredientsCount: Object.keys(ingredientIds).length,
      productsCount: Object.keys(productIds).length,
    };
  }
}
