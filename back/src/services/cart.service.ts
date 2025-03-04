import { FastifyInstance } from "fastify";

interface CartItemParams {
    "cartId": number;
    "productId": number;
    "quantity": number;
  }

export async function getAllCarts(fastify: FastifyInstance) {
    return fastify.prisma.cart.findMany({
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
}

export async function getCartById(fastify: FastifyInstance, id: number) {
    return fastify.prisma.cart.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
}

export async function getCartByUserId(fastify: FastifyInstance, userId: number) {
    return fastify.prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });
}

export async function getCartIdByUserId(fastify: FastifyInstance, userId: number) {
    return fastify.prisma.cart.findUnique({
        where: { userId },
        select: {
            id: true,
        }
    });
}

export async function createCart(fastify: FastifyInstance, data: any) {
    return fastify.prisma.cart.create({ data });
}

export async function deleteCart(fastify: FastifyInstance, id: number) {
    return fastify.prisma.cart.delete({ where: { id } });
}

export async function updateCartItem(fastify: FastifyInstance, id: number, data: any) {
    return fastify.prisma.cartItem.update({
        where: { id },
        data
    });
}

export async function addItemToCart(fastify: FastifyInstance, data: CartItemParams) {
    const existingCartItems = await fastify.prisma.cartItem.findMany({
        where: {
            cartId: data.cartId,
            productId: data.productId
        }
    });
    if (existingCartItems.length !== 0) {
        if(existingCartItems.length > 1) {
            let updatedCartItems = [];
            for (const existingCartItem of existingCartItems) {
                const updatedCartItem = await updateCartItem(fastify, existingCartItem.id, {
                    quantity: existingCartItem.quantity + data.quantity
                });
                updatedCartItems.push(updatedCartItem);
            }
            return updatedCartItems;
        } else {
            const existingCartItem = existingCartItems[0];
            const updatedCartItem = await updateCartItem(fastify, existingCartItem.id, {
                quantity: existingCartItem.quantity + data.quantity
            });
            return updatedCartItem;
        }
    }
    return fastify.prisma.cartItem.create({ data });
}

export async function removeCartItem(fastify: FastifyInstance, id: number) {
    return fastify.prisma.cartItem.delete({ where: { id } });
}

export async function addMultipleItemsToCart(fastify: FastifyInstance, items: CartItemParams[]) {
    // Use transaction to ensure all items are added or none
    return fastify.prisma.$transaction(
        items.map(item => 
            fastify.prisma.cartItem.create({ 
                data: item,
                include: {
                    product: true
                }
            })
        )
    );
}

export async function getCartItems(fastify: FastifyInstance, cartId: number) {
    return fastify.prisma.cartItem.findMany({
        where: { cartId },
        include: {
            product: true
        },
        orderBy: {
            id: 'asc'
        }
    });
}

export async function clearCart(fastify: FastifyInstance, cartId: number) {
    return fastify.prisma.cartItem.deleteMany({
        where: { cartId }
    });
}