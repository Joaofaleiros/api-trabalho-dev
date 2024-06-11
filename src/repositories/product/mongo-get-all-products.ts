import { IGetAllProductsRepository } from "../../controllers/product/get-all-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { Product } from "../../models/produto";

export class MongoGetAllProductsRepository
  implements IGetAllProductsRepository
{
  async getProducts(): Promise<Product[]> {
    const products = await MongoClient.db
      .collection<Omit<Product, "id">>("products")
      .find({})
      .toArray();

    return products.map((product) => {
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
    });
  }
}
