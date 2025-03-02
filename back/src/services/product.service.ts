import { FastifyInstance } from "fastify";

export async function getAllProducts(fastify: FastifyInstance) {
    return fastify.prisma.product.findMany();
}

export async function getProductById(fastify: FastifyInstance, id: number) {
    return fastify.prisma.product.findUnique({ where: { id } });
}

export async function getProductsByCategory(fastify: FastifyInstance, categoryId: number) {
    return fastify.prisma.product.findMany({
        where: { categoryId }
    });
}

export async function getDiscountedProducts(fastify: FastifyInstance, categoryId?: number) {
    return fastify.prisma.product.findMany({
        where: {
            isDiscounted: true,
            ...(categoryId && { categoryId })
        }
    });
}

export async function applyDiscountToCategory(
    fastify: FastifyInstance, 
    categoryIds: number[], 
    discountPercent: number
) {
    return fastify.prisma.product.updateMany({
        where: {
            categoryId: {
                in: categoryIds
            }
        },
        data: {
            isDiscounted: true,
            discountPercent
        }
    });
}

export async function removeDiscountFromCategory(fastify: FastifyInstance, categoryIds: number[]) {
    return fastify.prisma.product.updateMany({
        where: {
            categoryId: {
                in: categoryIds
            }
        },
        data: {
            isDiscounted: false,
            discountPercent: 0
        }
    });
}

export async function createProduct(fastify: FastifyInstance, data: any) {
    return fastify.prisma.product.create({ data });
}

export async function deleteProduct(fastify: FastifyInstance, id: number) {
    return fastify.prisma.product.delete({ where: { id } });
}