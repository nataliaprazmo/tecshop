import { FastifyInstance } from "fastify";
import { getProducts, getProduct, createProductHandler, deleteProductHandler, getProductsByCategoryHandler, applyDiscountHandler, removeDiscountHandler, getFilteredProductsHandler } from "../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
    fastify.get("/products", getProducts);
    fastify.get("/categories/:categoryId/products", getProductsByCategoryHandler);
    fastify.get("/products/:id", getProduct);
    fastify.post("/products", createProductHandler);
    fastify.get('/api/products/filtered', getFilteredProductsHandler);
    fastify.delete("/products/:id", deleteProductHandler);
    fastify.post("/products/discounts", applyDiscountHandler);
    fastify.delete("/products/discounts", removeDiscountHandler);
}