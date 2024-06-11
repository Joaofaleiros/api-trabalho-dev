import {
  ICreateProductRepository,
  CreateProductParams,
} from "../../controllers/product/create-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { Product } from "../../models/produto";

export class MongoCreateProductRepository implements ICreateProductRepository {
  async createProduct(params: CreateProductParams): Promise<Product> {
    const { insertedId } = await MongoClient.db
      .collection("products")
      .insertOne(params);

    const product = await MongoClient.db
      .collection<Omit<Product, "id">>("products")
      .findOne({ _id: insertedId });

    if (!product) {
      throw new Error("Erro ao criar produto");
    }

    return {
      id: product._id.toHexString(),
      name: product.name,
      description: product.description,
      color: product.color,
      weight: product.weight,
      type: product.type,
      price: product.price,
      created_at: product.created_at,
    };
  }
}
