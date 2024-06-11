import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";

export interface UpdateProductParams {
  name?: string;
  description?: string;
  color?: string;
  weight?: number;
  type?: string;
  price?: number;
}

export interface IUpdateProductController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>>;
}

export interface IUpdateProductRepository {
  updateProduct(id: string, params: UpdateProductParams): Promise<Produto>;
}
