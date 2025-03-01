"use strict";

import dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";
import Fastify from "fastify";
import prisma from "./plugins/prisma";
import categoryRoutes from "./routes/category.route";
import userRoutes from "./routes/user.route";
import productRoutes from "./routes/product.route";
import cartRoutes from "./routes/cart.route";

const fastify = Fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
});

// allow frontend
fastify.register(cors, {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	credentials: true,
});

// register routes
fastify.register(categoryRoutes, { prefix: "/api" });
fastify.register(userRoutes, { prefix: "/api" });
fastify.register(productRoutes, { prefix: "/api" });
fastify.register(cartRoutes, { prefix: "/api" });

// register plugins
fastify.register(prisma);

// TEST
fastify.get("/", async () => {
	return { message: "Witaj w TecSklep!" };
});

const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || "127.0.0.1";

const start = async () => {
	try {
		await fastify.listen({ port, host });
		console.log(fastify.printRoutes());
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();