import { FastifyRequest, FastifyReply } from "fastify";
import { getAllUsers, getUserById, createUser, deleteUser } from "../services/user.service";

interface Params { id: string; }
interface CreateUserBody { username: string; email: string; password: string; }

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const users = await getAllUsers(request.server);
        reply.send(users);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching users" });
    }
}

export async function getUser(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        const user = await getUserById(request.server, id);
        if (!user) return reply.status(404).send({ error: "User not found" });
        reply.send(user);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching user" });
    }
}

export async function createUserHandler(request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
    try {
        const user = await createUser(request.server, request.body);
        reply.status(201).send(user);
    } catch (error) {
        reply.status(400).send({ error: "Could not create user" });
    }
}

export async function deleteUserHandler(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        await deleteUser(request.server, id);
        reply.status(204).send();
    } catch (error) {
        reply.status(400).send({ error: "Could not delete user" });
    }
}
