import { IGetAllProductsController, IGetAllProductsRepository } from "./protocols";

export class GetAllProductsController implements IGetAllProductsController {
  constructor(private readonly getAllProductsRepository: IGetAllProductsRepository) {
    this.getAllProductsRepository = getAllProductsRepository;
  }

  async handle() {
    try {
      const products = await this.getAllProductsRepository.getProducts();

      return {
        statusCode: 200, 
        body: products,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error',
      };
    }
  }
}
