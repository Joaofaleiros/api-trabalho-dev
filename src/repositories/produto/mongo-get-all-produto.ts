import { IGetAllProdutoRepository } from "../../controllers/product/get-all-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { Produto } from "../../models/produto";

export class MongoGetAllProdutoRepository implements IGetAllProdutoRepository {
  async getProducts(): Promise<Produto[]> {
    const products = await MongoClient.db
      .collection<Omit<Produto, "id">>("products")
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
