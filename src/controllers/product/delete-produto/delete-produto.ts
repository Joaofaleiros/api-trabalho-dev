import { IDeleteProdutoController } from "./protocols";
import { IDeleteProdutoRepository } from "./protocols";
import { HttpRequest, HttpResponse } from "../../protocols";
import { Produto } from "../../../models/produto";

export class DeleteProdutoController implements IDeleteProdutoController {
  constructor(
    private readonly deleteProdutoRepository: IDeleteProdutoRepository
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id inválido",
        };
      }

      const product = await this.deleteProdutoRepository.deleteProduto(id);

      return {
        statusCode: 200,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro interno",
      };
    }
  }
}
