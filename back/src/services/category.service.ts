import { FastifyInstance } from "fastify";

export async function getAllCategories(fastify: FastifyInstance) {
	return fastify.prisma.category.findMany();
}
