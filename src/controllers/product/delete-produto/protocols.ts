import { Produto } from "../../../models/produto";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteProdutoRepository {
  deleteProduto: (id: string) => Promise<Produto>;
}

export interface IDeleteProdutoController {
  handle: (httpRequest: HttpRequest<any>) => Promise<HttpResponse<Produto>>;
}
