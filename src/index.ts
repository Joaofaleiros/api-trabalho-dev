import express from "express";
import { config } from "dotenv";
import { MongoGetAllProdutoRepository } from "./repositories/produto/mongo-get-all-produto";
import { MongoGetProdutoRepository } from "./repositories/produto/mongo-get-produto";
import { MongoCreateProdutoRepository } from "./repositories/produto/monto-create-produto";
import { MongoUpdateProdutoRepository } from "./repositories/produto/mongo-update-produto";
import { GetAllProdutoController } from "./controllers/product/get-all-produto/get-all-products";
import { GetProdutoController } from "./controllers/product/get-produto/get.product";
import { CreateProdutoController } from "./controllers/product/create-produto/create-produto";
import { UpdateProdutoController } from "./controllers/product/update-produto/update-produto";
import { MongoClient } from "./database/mongo";
import { MongoDeleteProdutoRepository } from "./repositories/produto/mongo-delete-produto";
import { DeleteProdutoController } from "./controllers/product/delete-produto/delete-produto";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  const port = process.env.PORT || 3000;
  await MongoClient.connect();

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.get("/produtos", async (req, res) => {
    console.log("GET /products");

    const mongoGetAllProdutoRepository = new MongoGetAllProdutoRepository();

    const getAllProdutoController = new GetAllProdutoController(
      mongoGetAllProdutoRepository
    );

    const response = await getAllProdutoController.handle();

    res.status(response.statusCode).json(response.body);
  });

  app.get("/produtos/:id", async (req, res) => {
    console.log("GET /products/:id");

    const mongoGetProdutoRepository = new MongoGetProdutoRepository();

    const getProdutoController = new GetProdutoController(
      mongoGetProdutoRepository
    );

    const response = await getProdutoController.handle({ params: req.params });

    res.status(response.statusCode).json(response.body);
  });

  app.post("/produtos/cadastrar", async (req, res) => {
    console.log("POST /products/create");

    const mongoCreateProdutoRepository = new MongoCreateProdutoRepository();

    const createProdutoController = new CreateProdutoController(
      mongoCreateProdutoRepository
    );

    const response = await createProdutoController.handle({ body: req.body });

    res.status(response.statusCode).json(response.body);
  });

  app.patch("/produtos/atualizar/:id", async (req, res) => {
    console.log("PATCH /products/update/:id");

    const mongoUpdateProductRepository = new MongoUpdateProdutoRepository();

    const updateProductController = new UpdateProdutoController(
      mongoUpdateProductRepository
    );

    const response = await updateProductController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(response.statusCode).json(response.body);
  });

  app.delete("/produtos/deletar/:id", async (req, res) => {
    console.log("DELETE /products/delete/:id");

    const mongoDeleteProdutoRepository = new MongoDeleteProdutoRepository();

    const deleteProductController = new DeleteProdutoController(
      mongoDeleteProdutoRepository
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
