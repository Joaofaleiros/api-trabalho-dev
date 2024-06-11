import { IGetProductRepository } from "../../controllers/product/get-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { Product } from "../../models/produto";
import { ObjectId } from "mongodb";

export class MongoGetProductRepository implements IGetProductRepository {
  async getProduct(id: string): Promise<Product> {
    const product = await MongoClient.db
      .collection<Omit<Product, "id">>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Produto não encontrado");
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
