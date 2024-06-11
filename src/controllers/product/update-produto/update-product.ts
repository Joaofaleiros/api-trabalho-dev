import { HttpResponse } from "../../protocols";
import { IUpdateProductController } from "./protocols";
import { HttpRequest } from "../../protocols";
import { Produto } from "../../../models/produto";
import { IUpdateProductRepository } from "./protocols";

export class UpdateProductController implements IUpdateProductController {
  constructor(
    private readonly updateProductRepository: IUpdateProductRepository
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Produto>> {
    try {
      const { id } = httpRequest.params;
      const { name, description, color, weight, type, price } =
        httpRequest.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "Id inválido",
        };
      }

      const allowedFields = [
        "name",
        "description",
        "color",
        "weight",
        "type",
        "price",
      ];

      const receivedFields = Object.keys(httpRequest.body);

      const isValidField = receivedFields.every((field) =>
        allowedFields.includes(field)
      );

      if (!isValidField) {
        return {
          statusCode: 400,
          body: "Campo inválido",
        };
      }

      const product = await this.updateProductRepository.updateProduct(id, {
        name,
        description,
        color,
        weight,
        type,
        price,
      });

      return {
        statusCode: 200,
        body: product,
      };
      ``;
    } catch (error) {
      return {
        statusCode: 500,
        body: "Erro interno",
      };
    }
  }
}
