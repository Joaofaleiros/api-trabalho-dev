import { Produto } from "../../../models/produto";
import { HttpResponse, HttpRequest } from "../../protocols";
import {
  CreateProductParams,
  ICreateProductController,
  ICreateProductRepository,
} from "./protocols";

export class CreateProductController implements ICreateProductController {
  constructor(
    private readonly createProductRepository: ICreateProductRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateProductParams>
  ): Promise<HttpResponse<Produto>> {
    if (!httpRequest.body) {
      return {
        statusCode: 400,
        body: "Missing param: body",
      };
    }

    const { name, description, color, weight, type, price, created_at } =
      httpRequest.body;

    switch (true) {
      case !name:
        return {
          statusCode: 400,
          body: "O nome do produto é obrigatório",
        };
      case !description:
        return {
          statusCode: 400,
          body: "A descrição do produto é obrigatória",
        };
      case !color:
        return {
          statusCode: 400,
          body: "A cor do produto é obrigatória",
        };
      case !weight:
        return {
          statusCode: 400,
          body: "O peso do produto é obrigatório",
        };
      case !type:
        return {
          statusCode: 400,
          body: "O tipo do produto é obrigatório",
        };
      case !price:
        return {
          statusCode: 400,
          body: "O preço do produto é obrigatório",
        };
    }

    try {
      const product = await this.createProductRepository.createProduct({
        name,
        description,
        color,
        weight,
        type,
        price,
        created_at: new Date(),
      });

      return {
        statusCode: 201,
        body: product,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
