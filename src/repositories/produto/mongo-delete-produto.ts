import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";
import { Produto } from "../../models/produto";
import { IDeleteProdutoRepository } from "../../controllers/product/delete-produto/protocols";

export class MongoDeleteProdutoRepository implements IDeleteProdutoRepository {
  async deleteProduto(id: string): Promise<Produto> {
    const product = await MongoClient.db
      .collection<Omit<Produto, "id">>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    await MongoClient.db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

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
