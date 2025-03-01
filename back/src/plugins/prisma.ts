import fp from "fastify-plugin";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

const prisma = fp(async (fastify) => {
	const prismaClient = new PrismaClient();

	fastify.decorate("prisma", prismaClient);

	fastify.addHook("onClose", async (fastify) => {
		await fastify.prisma.$disconnect();
	});
});

export default prisma;