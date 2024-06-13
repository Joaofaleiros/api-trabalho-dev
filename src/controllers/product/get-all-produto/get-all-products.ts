import {
  IGetAllProdutoController,
  IGetAllProdutoRepository,
} from "./protocols";

export class GetAllProdutoController implements IGetAllProdutoController {
  constructor(
    private readonly getAllProdutoRepository: IGetAllProdutoRepository
  ) {
    this.getAllProdutoRepository = getAllProdutoRepository;
  }

  async handle() {
    try {
      const products = await this.getAllProdutoRepository.getProducts();

      return {
        statusCode: 200,
        body: products,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Internal server error",
      };
    }
  }
}
