import { FastifyInstance } from "fastify";

export async function getAllUsers(fastify: FastifyInstance) {
    return fastify.prisma.user.findMany();
}

export async function getUserById(fastify: FastifyInstance, id: number) {
    return fastify.prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(fastify: FastifyInstance, email: string) {
    return fastify.prisma.user.findUnique({ where: { email } });
}

export async function createUser(fastify: FastifyInstance, data: { username: string, email: string, password: string }) {
    return fastify.prisma.user.create({ data });
}

export async function deleteUser(fastify: FastifyInstance, id: number) {
    return fastify.prisma.user.delete({ where: { id } });
}