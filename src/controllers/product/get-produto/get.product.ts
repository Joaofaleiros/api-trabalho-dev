import { IGetProdutoController } from "./protocols";
import { IGetProdutoRepository } from "./protocols";
import { HttpRequest, HttpResponse } from "../../protocols";
import { Produto } from "../../../models/produto";

export class GetProdutoController implements IGetProdutoController {
  constructor(private readonly getProdutoRepository: IGetProdutoRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>> {
    try {
      const { id } = httpRequest.params;

      const product = await this.getProdutoRepository.getProduct(id);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: "Produto não encontrado",
      };
    }
  }
}
