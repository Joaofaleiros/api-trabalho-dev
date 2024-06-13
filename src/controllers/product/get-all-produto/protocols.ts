import { Produto } from "../../../models/produto";
import { HttpResponse } from "../../protocols";

export interface IGetAllProdutoController {
  handle(): Promise<HttpResponse<Produto[]>>;
}

export interface IGetAllProdutoRepository {
  getProducts(): Promise<Produto[]>;
}
