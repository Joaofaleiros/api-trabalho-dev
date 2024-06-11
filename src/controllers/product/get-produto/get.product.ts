import { IGetProductController } from "./protocols";
import { IGetProductRepository } from "./protocols";
import { HttpRequest, HttpResponse } from "../../protocols";
import { Produto } from "../../../models/produto";

export class GetProductController implements IGetProductController {
  constructor(private readonly getProductRepository: IGetProductRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>> {
    try {
      const { id } = httpRequest.params;

      const product = await this.getProductRepository.getProduct(id);

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
