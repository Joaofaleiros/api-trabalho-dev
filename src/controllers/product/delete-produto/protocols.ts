import { Produto } from "../../../models/produto";
import { HttpRequest, HttpResponse } from "../../protocols";

export interface IDeleteProductRepository {
  deleteProduct: (id: string) => Promise<Produto>;
}

export interface IDeleteProductController {
  handle: (httpRequest: HttpRequest<any>) => Promise<HttpResponse<Produto>>;
}
