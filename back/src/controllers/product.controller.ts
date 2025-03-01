import { FastifyReply, FastifyRequest } from "fastify";
import { getAllProducts, getProductById, createProduct, deleteProduct } from "../services/product.service";

interface Params { id: string; }

export async function getProducts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const products = await getAllProducts(request.server);
        reply.send(products);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching products" });
    }
}

export async function getProduct(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        const product = await getProductById(request.server, id);
        if (!product) return reply.status(404).send({ error: "Product not found" });
        reply.send(product);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching product" });
    }
}

export async function createProductHandler(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
        const product = await createProduct(request.server, request.body);
        reply.status(201).send(product);
    } catch (error) {
        reply.status(400).send({ error: "Could not create product" });
    }
}

export async function deleteProductHandler(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        await deleteProduct(request.server, id);
        reply.status(204).send();
    } catch (error) {
        reply.status(400).send({ error: "Could not delete product" });
    }
}
