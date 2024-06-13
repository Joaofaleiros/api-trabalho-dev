import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";

export interface IGetProdutoController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>>;
}

export interface IGetProdutoRepository {
  getProduct(id: string): Promise<Produto>;
}
