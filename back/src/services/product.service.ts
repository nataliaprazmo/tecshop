import { FastifyInstance } from "fastify";

export async function getAllProducts(fastify: FastifyInstance) {
    return fastify.prisma.product.findMany();
}

export async function getProductById(fastify: FastifyInstance, id: number) {
    return fastify.prisma.product.findUnique({ where: { id } });
}

export async function createProduct(fastify: FastifyInstance, data: any) {
    return fastify.prisma.product.create({ data });
}

export async function deleteProduct(fastify: FastifyInstance, id: number) {
    return fastify.prisma.product.delete({ where: { id } });
}