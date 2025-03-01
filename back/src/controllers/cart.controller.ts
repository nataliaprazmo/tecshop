import { FastifyReply, FastifyRequest } from "fastify";
import { 
    getAllCarts, 
    getCartById, 
    getCartByUserId,
    createCart, 
    deleteCart,
    addItemToCart,
    updateCartItem,
    removeCartItem
} from "../services/cart.service";

interface Params { 
    id: string;
    userId: string;
    itemId: string;
}

interface CartItemBody {
    cartId: number;
    productId: number;
    quantity: number;
}

// Cart Controllers
export async function getCarts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const carts = await getAllCarts(request.server);
        reply.send(carts);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching carts" });
    }
}

export async function getCart(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        const cart = await getCartById(request.server, id);
        if (!cart) return reply.status(404).send({ error: "Cart not found" });
        reply.send(cart);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching cart" });
    }
}

export async function getUserCart(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const userId = Number(request.params.userId);
        const cart = await getCartByUserId(request.server, userId);
        if (!cart) return reply.status(404).send({ error: "Cart not found for this user" });
        reply.send(cart);
    } catch (error) {
        reply.status(500).send({ error: "Error fetching user cart" });
    }
}

export async function createCartHandler(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
    try {
        const cart = await createCart(request.server, request.body);
        reply.status(201).send(cart);
    } catch (error) {
        reply.status(400).send({ error: "Could not create cart" });
    }
}

export async function deleteCartHandler(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.id);
        await deleteCart(request.server, id);
        reply.status(204).send();
    } catch (error) {
        reply.status(400).send({ error: "Could not delete cart" });
    }
}

// Cart Item Controllers
export async function addCartItemHandler(request: FastifyRequest<{ Body: CartItemBody }>, reply: FastifyReply) {
    try {
        const cartItem = await addItemToCart(request.server, request.body);
        reply.status(201).send(cartItem);
    } catch (error) {
        reply.status(400).send({ error: "Could not add item to cart" });
    }
}

export async function updateCartItemHandler(
    request: FastifyRequest<{ Params: Params, Body: Pick<CartItemBody, 'quantity'> }>,
    reply: FastifyReply
) {
    try {
        const id = Number(request.params.itemId);
        const cartItem = await updateCartItem(request.server, id, request.body);
        reply.send(cartItem);
    } catch (error) {
        reply.status(400).send({ error: "Could not update cart item" });
    }
}

export async function removeCartItemHandler(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    try {
        const id = Number(request.params.itemId);
        await removeCartItem(request.server, id);
        reply.status(204).send();
    } catch (error) {
        reply.status(400).send({ error: "Could not remove item from cart" });
    }
}