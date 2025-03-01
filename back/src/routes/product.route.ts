import { FastifyInstance } from "fastify";
import { getProducts, getProduct, createProductHandler, deleteProductHandler } from "../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
    fastify.get("/products", getProducts);
    fastify.get("/products/:id", getProduct);
    fastify.post("/products", createProductHandler);
    fastify.delete("/products/:id", deleteProductHandler);
}