import { IUpdateProdutoRepository } from "../../controllers/product/update-produto/protocols";
import { Produto } from "../../models/produto";
import { UpdateProdutoParams } from "../../controllers/product/update-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { ObjectId } from "mongodb";

export class MongoUpdateProdutoRepository implements IUpdateProdutoRepository {
  async updateProduct(
    id: string,
    params: UpdateProdutoParams
  ): Promise<Produto> {
    await MongoClient.db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: params });

    const product = await MongoClient.db
      .collection<Omit<Produto, "id">>("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Erro ao atualizar produto");
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
