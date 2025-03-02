import { FastifyInstance } from "fastify";

export async function getAllCategories(fastify: FastifyInstance) {
	return fastify.prisma.category.findMany();
}

export async function getCategoryName(fastify: FastifyInstance, id: number) {
	return fastify.prisma.category.findUnique({ where: { id } });
}