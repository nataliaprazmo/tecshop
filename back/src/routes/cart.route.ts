import { FastifyInstance } from "fastify";
import {
    getCarts,
    getCart,
    getUserCart,
    createCartHandler,
    deleteCartHandler,
    addCartItemHandler,
    updateCartItemHandler,
    removeCartItemHandler
} from "../controllers/cart.controller";

export default async function cartRoutes(fastify: FastifyInstance) {
    // Cart routes
    fastify.get("/carts", getCarts);
    fastify.get("/carts/:id", getCart);
    fastify.get("/users/:userId/cart", getUserCart);
    fastify.post("/carts", createCartHandler);
    fastify.delete("/carts/:id", deleteCartHandler);
    
    // Cart item routes
    fastify.post("/cart-items", addCartItemHandler);
    fastify.patch("/cart-items/:itemId", updateCartItemHandler);
    fastify.delete("/cart-items/:itemId", removeCartItemHandler);
}