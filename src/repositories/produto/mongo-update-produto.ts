import { IUpdateProductRepository } from "../../controllers/product/update-produto/protocols";
import { Produto } from "../../models/produto";
import { UpdateProductParams } from "../../controllers/product/update-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { ObjectId } from "mongodb";

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  async updateProduct(
    id: string,
    params: UpdateProductParams
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
