import { FastifyInstance } from "fastify";
import { getUsers, getUser, createUserHandler, deleteUserHandler, loginUser } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/users", getUsers);
    fastify.get("/users/:id", getUser);
    fastify.post("/users", createUserHandler);
    fastify.delete("/users/:id", deleteUserHandler);
    fastify.post("/login", loginUser);
}