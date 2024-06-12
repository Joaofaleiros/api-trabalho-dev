import {
  ICreateProdutoRepository,
  CreateProdutoParams,
} from "../../controllers/product/create-produto/protocols";
import { MongoClient } from "../../database/mongo";
import { Produto } from "../../models/produto";

export class MongoCreateProductRepository implements ICreateProdutoRepository {
  async createProduto(params: CreateProdutoParams): Promise<Produto> {
    const { insertedId } = await MongoClient.db
      .collection("products")
      .insertOne(params);

    const produto = await MongoClient.db
      .collection<Omit<Produto, "id">>("products")
      .findOne({ _id: insertedId });

    if (!produto) {
      throw new Error("Erro ao criar produto");
    }

    return {
      id: produto._id.toHexString(),
      name: produto.name,
      description: produto.description,
      color: produto.color,
      weight: produto.weight,
      type: produto.type,
      price: produto.price,
      created_at: produto.created_at,
    };
  }
}
