import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: {
			id: string;
			email: string;
		};
	}
}

declare module "fastify" {
	interface FastifyInstance {
		auth: any;
	}
}

const auth = fp(async (fastify) => {
	await fastify.register(fastifyCookie, {
		secret: process.env.COOKIE_SECRET,
	});

	fastify.register(fastifyJwt, {
		secret: process.env.JWT_SECRET || "supersecret",
		cookie: {
			cookieName: "token",
			signed: false,
		},
		sign: {
			expiresIn: "1h",
		},
	});

	fastify.decorate(
		"auth",
		async function (request: FastifyRequest, reply: FastifyReply) {
			try {
				const token = request.cookies.token;
				if (!token) {
					return reply
						.status(401)
						.send({ message: "Token not found" });
				}
				await request.jwtVerify();
				request.user = request.user;
			} catch (err) {
				return reply
					.status(401)
					.send({ message: "Invalid token", error: err });
			}
		}
	);
});

export default auth;
