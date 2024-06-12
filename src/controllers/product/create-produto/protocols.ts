import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";

export interface ICreateProdutoController {
  handle(
    httpRequest: HttpRequest<CreateProdutoParams>
  ): Promise<HttpResponse<Produto>>;
}

export interface CreateProdutoParams {
  name: string;
  description: string;
  color: string;
  weight: number;
  type: string;
  price: number;
  created_at: Date;
}

export interface ICreateProdutoRepository {
  createProduto(params: CreateProdutoParams): Promise<Produto>;
}
