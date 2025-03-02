import { FastifyRequest, FastifyReply } from "fastify";
import { getAllCategories, getCategoryName } from "../services/category.service";

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

export async function getCategoryNameHandler(request: FastifyRequest<{ Params: {id: string } }>,
	reply: FastifyReply) {
		try {
			const id = Number(request.params.id);
			const category = await getCategoryName(request.server, id);
			reply.send({ message: "Category fetched successfully", category});
		} catch (error) {
			reply.status(500).send({ message: "Error fetching category", error });
		}
}