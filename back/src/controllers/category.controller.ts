import { FastifyRequest, FastifyReply } from "fastify";
import { getAllCategories } from "../services/category.service";

export async function getCategories(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const categories = await getAllCategories(request.server);
		reply.send({ message: "Categories fetched successfully", categories });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching categories", error });
	}
}