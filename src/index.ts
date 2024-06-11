import express from "express";
import { config } from "dotenv";
import { MongoGetAllProductsRepository } from "./repositories/product/mongo-get-all-products";
import { MongoGetProductRepository } from "./repositories/product/mongo-get-product";
import { MongoCreateProductRepository } from "./repositories/product/monto-create-product";
import { MongoUpdateProductRepository } from "./repositories/product/mongo-update-product";
import { GetAllProductsController } from "./controllers/product/get-all-produto/get-all-products";
import { GetProductController } from "./controllers/product/get-produto/get.product";
import { CreateProductController } from "./controllers/product/create-produto/create-product";
import { UpdateProductController } from "./controllers/product/update-produto/update-product";
import { MongoClient } from "./database/mongo";
import { MongoDeleteProductRepository } from "./repositories/product/mongo-delete-product";
import { DeleteProductController } from "./controllers/product/delete-produto/delete-product";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  const port = process.env.PORT || 3000;
  await MongoClient.connect();

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.get("/products", async (req, res) => {
    console.log("GET /products");

    const mongoGetAllProductsRepository = new MongoGetAllProductsRepository();

    const getAllProductsController = new GetAllProductsController(
      mongoGetAllProductsRepository
    );

    const response = await getAllProductsController.handle();

    res.status(response.statusCode).json(response.body);
  });

  app.get("/products/:id", async (req, res) => {
    console.log("GET /products/:id");

    const mongoGetProductRepository = new MongoGetProductRepository();

    const getProductController = new GetProductController(
      mongoGetProductRepository
    );

    const response = await getProductController.handle({ params: req.params });

    res.status(response.statusCode).json(response.body);
  });

  app.post("/products/create", async (req, res) => {
    console.log("POST /products/create");

    const mongoCreateProductRepository = new MongoCreateProductRepository();

    const createProductController = new CreateProductController(
      mongoCreateProductRepository
    );

    const response = await createProductController.handle({ body: req.body });

    res.status(response.statusCode).json(response.body);
  });

  app.patch("/products/update/:id", async (req, res) => {
    console.log("PATCH /products/update/:id");

    const mongoUpdateProductRepository = new MongoUpdateProductRepository();

    const updateProductController = new UpdateProductController(
      mongoUpdateProductRepository
    );

    const response = await updateProductController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(response.statusCode).json(response.body);
  });

  app.delete("/products/delete/:id", async (req, res) => {
    console.log("DELETE /products/delete/:id");

    const mongoDeleteProductRepository = new MongoDeleteProductRepository();

    const deleteProductController = new DeleteProductController(
      mongoDeleteProductRepository
    );

    const response = await deleteProductController.handle({
      params: req.params,
    });

    res.status(response.statusCode).json(response.body);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();
