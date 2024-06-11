import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";

export interface IGetProductController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>>;
}

export interface IGetProductRepository {
  getProduct(id: string): Promise<Produto>;
}
