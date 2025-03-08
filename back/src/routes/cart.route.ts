import { FastifyInstance } from "fastify";
import {
	getCarts,
	getCart,
	getUserCart,
	createCartHandler,
	deleteCartHandler,
	addCartItemHandler,
	updateCartItemHandler,
	removeCartItemHandler,
	addMultipleCartItemsHandler,
	getCartItemsHandler,
	clearCartHandler,
} from "../controllers/cart.controller";

export default async function cartRoutes(fastify: FastifyInstance) {
	// Cart routes
	fastify.get("/carts", getCarts);
	fastify.get("/carts/:id", getCart);
	fastify.get("/users/cart", { preHandler: [fastify.auth] }, getUserCart);
	fastify.post("/carts", createCartHandler);
	fastify.delete("/carts/:id", deleteCartHandler);

	// Cart item routes
	fastify.post(
		"/cart-items",
		{ preHandler: [fastify.auth] },
		addCartItemHandler
	);
	fastify.post(
		"/cart-items/bulk",
		{ preHandler: [fastify.auth] },
		addMultipleCartItemsHandler
	);
	fastify.get("/carts/:cartId/items", getCartItemsHandler);
	fastify.delete(
		"/carts/items",
		{ preHandler: [fastify.auth] },
		clearCartHandler
	);
	fastify.patch("/cart-items/:itemId", updateCartItemHandler);
	fastify.delete("/cart-items/:itemId", removeCartItemHandler);
}
