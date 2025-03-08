import { FastifyReply, FastifyRequest } from "fastify";
import {
	getAllProducts,
	getProductById,
	getProductsByCategory,
	getDiscountedProducts,
	applyDiscountToCategory,
	removeDiscountFromCategory,
	createProduct,
	deleteProduct,
	getFilteredProducts,
} from "../services/product.service";

interface Params {
	id: string;
}

interface CategoryParams {
	id: string;
	categoryId: string;
}

interface QueryParams {
	discounted?: string;
	categoryId?: string;
	priceMin?: string;
	priceMax?: string;
	sortBy?: string;
	sortOrder?: string;
}

interface DiscountBody {
	categoryIds: number[];
	discountPercent: number;
}

export async function getProducts(
	request: FastifyRequest<{ Querystring: QueryParams }>,
	reply: FastifyReply
) {
	try {
		const { discounted, categoryId } = request.query;

		// If discounted flag is present, return discounted products
		if (discounted === "true") {
			const categoryIdNum = categoryId ? Number(categoryId) : undefined;
			const products = await getDiscountedProducts(
				request.server,
				categoryIdNum
			);
			return reply.send(products);
		}

		// If only categoryId is present, return products by category
		if (categoryId) {
			const products = await getProductsByCategory(
				request.server,
				Number(categoryId)
			);
			return reply.send(products);
		}

		// Otherwise return all products
		const products = await getAllProducts(request.server);
		reply.send(products);
	} catch (error) {
		reply.status(500).send({ error: "Error fetching products" });
	}
}

export async function getFilteredProductsHandler(
	request: FastifyRequest<{ Querystring: QueryParams }>,
	reply: FastifyReply
) {
	try {
		const {
			discounted,
			categoryId,
			priceMin,
			priceMax,
			sortBy,
			sortOrder,
		} = request.query;

		// Convert parameters to appropriate types
		const filters = {
			categoryId: categoryId ? Number(categoryId) : undefined,
			isDiscounted: discounted === "true" || undefined,
			priceMin: priceMin ? Number(priceMin) : undefined,
			priceMax: priceMax ? Number(priceMax) : undefined,
			sortBy: sortBy === "price" ? "price" : undefined,
			sortOrder:
				sortOrder === "desc" ? ("desc" as const) : ("asc" as const),
		};

		// Use the new combined filter function
		const products = await getFilteredProducts(request.server, filters);
		return reply.send(products);
	} catch (error) {
		console.error("Error fetching products:", error);
		reply.status(500).send({ error: "Error fetching products" });
	}
}

export async function getProduct(
	request: FastifyRequest<{ Params: Params }>,
	reply: FastifyReply
) {
	try {
		const id = Number(request.params.id);
		const product = await getProductById(request.server, id);
		if (!product)
			return reply.status(404).send({ error: "Product not found" });
		reply.send(product);
	} catch (error) {
		reply.status(500).send({ error: "Error fetching product" });
	}
}

export async function getProductsByCategoryHandler(
	request: FastifyRequest<{ Params: CategoryParams }>,
	reply: FastifyReply
) {
	try {
		const categoryId = Number(request.params.categoryId);
		const products = await getProductsByCategory(
			request.server,
			categoryId
		);
		reply.send(products);
	} catch (error) {
		reply
			.status(500)
			.send({ error: "Error fetching products by category" });
	}
}

export async function createProductHandler(
	request: FastifyRequest<{ Body: any }>,
	reply: FastifyReply
) {
	try {
		const product = await createProduct(request.server, request.body);
		reply.status(201).send(product);
	} catch (error) {
		reply.status(400).send({ error: "Could not create product" });
	}
}

export async function applyDiscountHandler(
	request: FastifyRequest<{ Body: DiscountBody }>,
	reply: FastifyReply
) {
	try {
		const { categoryIds, discountPercent } = request.body;

		if (!Array.isArray(categoryIds) || !categoryIds.length) {
			return reply
				.status(400)
				.send({ error: "At least one category ID is required" });
		}

		if (discountPercent < 0 || discountPercent > 100) {
			return reply
				.status(400)
				.send({
					error: "Discount percentage must be between 0 and 100",
				});
		}

		const result = await applyDiscountToCategory(
			request.server,
			categoryIds,
			discountPercent
		);

		reply.status(200).send({
			message: `Discount applied to ${result.count} products`,
			affectedProducts: result.count,
		});
	} catch (error) {
		reply.status(500).send({ error: "Error applying discount" });
	}
}

export async function removeDiscountHandler(
	request: FastifyRequest<{ Body: { categoryIds: number[] } }>,
	reply: FastifyReply
) {
	try {
		const { categoryIds } = request.body;

		if (!Array.isArray(categoryIds) || !categoryIds.length) {
			return reply
				.status(400)
				.send({ error: "At least one category ID is required" });
		}

		const result = await removeDiscountFromCategory(
			request.server,
			categoryIds
		);

		reply.status(200).send({
			message: `Discount removed from ${result.count} products`,
			affectedProducts: result.count,
		});
	} catch (error) {
		reply.status(500).send({ error: "Error removing discount" });
	}
}

export async function deleteProductHandler(
	request: FastifyRequest<{ Params: Params }>,
	reply: FastifyReply
) {
	try {
		const id = Number(request.params.id);
		await deleteProduct(request.server, id);
		reply.status(204).send();
	} catch (error) {
		reply.status(400).send({ error: "Could not delete product" });
	}
}
