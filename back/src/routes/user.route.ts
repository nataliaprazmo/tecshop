import { FastifyInstance } from "fastify";
import { getUsers, getUser, createUserHandler, deleteUserHandler } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
    fastify.get("/users", getUsers);
    fastify.get("/users/:id", getUser);
    fastify.post("/users", createUserHandler);
    fastify.delete("/users/:id", deleteUserHandler);
}