import { FastifyRequest, FastifyReply } from "fastify";
import {
	getAllUsers,
	getUserById,
	createUser,
	deleteUser,
	getUserByEmail,
} from "../services/user.service";
import { createCart } from "../services/cart.service";
const bcrypt = require("bcrypt");

interface Params {
	id: string;
}
interface CreateUserBody {
	username: string;
	email: string;
	password: string;
}
interface LoginInput {
	email: string;
	password: string;
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
	try {
		const users = await getAllUsers(request.server);
		reply.send(users);
	} catch (error) {
		reply.status(500).send({ error: "Error fetching users" });
	}
}

export async function getUser(
	request: FastifyRequest<{ Params: Params }>,
	reply: FastifyReply
) {
	try {
		const id = Number(request.params.id);
		const user = await getUserById(request.server, id);
		if (!user) return reply.status(404).send({ error: "User not found" });
		reply.send(user);
	} catch (error) {
		reply.status(500).send({ error: "Error fetching user" });
	}
}

export async function createUserHandler(
	request: FastifyRequest<{ Body: CreateUserBody }>,
	reply: FastifyReply
) {
	try {
		const user = await getUserByEmail(request.server, request.body.email);
		if (user) {
			return reply.status(401).send({
				message: "There is already an account with this email",
			});
		}
		const hashedPassword = await bcrypt.hash(request.body.password, 10);
		const userData = { ...request.body, password: hashedPassword };
		const newUser = await createUser(request.server, userData);
		const userCart = await createCart(request.server, {
			userId: newUser.id,
		});
		reply.status(201).send({ user: newUser, userCart: userCart });
	} catch (error) {
		reply.status(400).send({ error: "Could not create user and/or cart" });
	}
}

export async function loginUser(
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply
) {
	try {
		const { email, password } = request.body;
		const user = await getUserByEmail(request.server, email);
		if (!user) {
			return reply.status(409).send({ message: "Invalid email" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return reply.status(409).send({ message: "Invalid password" });
		}
		const token = request.server.jwt.sign({
			id: user.id,
			email: user.email,
		});
		return reply
			.setCookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
				maxAge: 60 * 60,
			})
			.send({ message: "Login successful", userId: user.id });
	} catch (error) {
		reply.status(500).send({ message: "Error loging user in", error });
	}
}

export async function logoutUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		return reply
			.clearCookie("token", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
			})
			.send({ message: "Logout successful" });
	} catch (error) {
		reply.status(500).send({ message: "Error logging out", error });
	}
}

export async function isUserAuthenticated(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const token = request.cookies.token;
		if (!token) {
			return reply.status(401).send({ authenticated: false });
		}

		try {
			const decoded = request.server.jwt.verify(token);
			return reply.send({ authenticated: true, user: decoded });
		} catch (error) {
			return reply
				.status(401)
				.send({ authenticated: false, message: "Invalid token" });
		}
	} catch (error) {
		return reply
			.status(500)
			.send({
				authenticated: false,
				message: "Error checking authentication",
				error,
			});
	}
}

export async function deleteUserHandler(
	request: FastifyRequest<{ Params: Params }>,
	reply: FastifyReply
) {
	try {
		const id = Number(request.params.id);
		await deleteUser(request.server, id);
		reply.status(204).send();
	} catch (error) {
		reply.status(400).send({ error: "Could not delete user" });
	}
}
