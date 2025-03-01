import { FastifyInstance } from "fastify";
import * as CategoryController from "../controllers/category.controller";

export default async function categoryRoutes(fastify: FastifyInstance) {
	fastify.get("/categories", CategoryController.getCategories);
}
