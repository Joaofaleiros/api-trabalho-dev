import { Produto } from "../../../models/produto";
import { HttpResponse } from "../../protocols";

export interface IGetAllProductsController {
  handle(): Promise<HttpResponse<Produto[]>>;
}

export interface IGetAllProductsRepository {
  getProducts(): Promise<Produto[]>;
}
