import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";

export interface UpdateProdutoParams {
  name?: string;
  description?: string;
  color?: string;
  weight?: number;
  type?: string;
  price?: number;
}

export interface IUpdateProdutoController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>>;
}

export interface IUpdateProdutoRepository {
  updateProduct(id: string, params: UpdateProdutoParams): Promise<Produto>;
}
