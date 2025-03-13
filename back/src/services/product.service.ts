import { FastifyInstance } from "fastify";

interface ProductFilters {
	categoryId?: number;
	isDiscounted?: boolean;
	priceMin?: number;
	priceMax?: number;
	sortBy?: "price" | string | undefined;
	sortOrder?: "asc" | "desc";
}

export async function getAllProducts(fastify: FastifyInstance) {
	return fastify.prisma.product.findMany({
		select: {
			id: true,
			name: true,
			imagePath: true,
			description: true,
			price: true,
			isDiscounted: true,
			discountPercent: true,
		},
		orderBy: {
			name: "asc",
		},
	});
}

export async function getProductById(fastify: FastifyInstance, id: number) {
	return fastify.prisma.product.findUnique({ where: { id } });
}

export async function getProductsByCategory(
	fastify: FastifyInstance,
	categoryId: number
) {
	return fastify.prisma.product.findMany({
		where: { categoryId },
		select: {
			id: true,
			name: true,
			imagePath: true,
			description: true,
			price: true,
			isDiscounted: true,
			discountPercent: true,
		},
	});
}

export async function getProductsByPrice(
	fastify: FastifyInstance,
	{ priceMin, priceMax }: { priceMin?: number; priceMax?: number }
) {
	return fastify.prisma.product.findMany({
		where: {
			...(priceMin !== undefined && { price: { gte: priceMin } }),
			...(priceMax !== undefined && { price: { lte: priceMax } }),
		},
		select: {
			id: true,
			name: true,
			imagePath: true,
			description: true,
			price: true,
			isDiscounted: true,
			discountPercent: true,
		},
	});
}

export async function getDiscountedProducts(
	fastify: FastifyInstance,
	categoryId?: number
) {
	return fastify.prisma.product.findMany({
		where: {
			isDiscounted: true,
			...(categoryId && { categoryId }),
		},
		select: {
			id: true,
			name: true,
			imagePath: true,
			description: true,
			price: true,
			isDiscounted: true,
			discountPercent: true,
		},
	});
}

export async function getFilteredProducts(
	fastify: FastifyInstance,
	filters: ProductFilters
) {
	const { categoryId, isDiscounted, priceMin, priceMax, sortBy, sortOrder } =
		filters;

	let query: any = {
		where: {},
		select: {
			id: true,
			name: true,
			imagePath: true,
			description: true,
			price: true,
		},
		orderBy: {},
	};

	if (categoryId) {
		query.where.categoryId = categoryId;
	}

	if (typeof isDiscounted === "boolean") {
		query.where.isDiscounted = isDiscounted;
	}

	if (priceMin || priceMax) {
		if (priceMin && priceMax) {
			query.where.price = {
				gte: priceMin,
				lte: priceMax,
			};
		} else if (priceMin) {
			query.where.price = {
				gte: priceMin,
			};
		} else if (priceMax) {
			query.where.price = {
				lte: priceMax,
			};
		}
	}

	if (sortBy) {
		query.orderBy = { [sortBy]: sortOrder || "asc" };
	} else {
		delete query.orderBy;
	}

	if (Object.keys(query.where).length === 0) {
		delete query.where;
	}

	return fastify.prisma.product.findMany(query);
}

export async function searchProducts(
	fastify: FastifyInstance,
	searchTerm: string
) {
	try {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return await fastify.prisma.$queryRaw`
            SELECT
                id,
                name,
                imagePath,
                categoryId
            FROM Product
            WHERE
                LOWER(name) LIKE ${`%${lowerSearchTerm}%`} OR
                LOWER(description) LIKE ${`%${lowerSearchTerm}%`}
            ORDER BY name ASC
        `;
	} catch (error) {
		console.error("Database query error:", error);
		throw error;
	}
}

export async function applyDiscountToCategory(
	fastify: FastifyInstance,
	categoryIds: number[],
	discountPercent: number
) {
	return fastify.prisma.product.updateMany({
		where: {
			categoryId: {
				in: categoryIds,
			},
		},
		data: {
			isDiscounted: true,
			discountPercent,
		},
	});
}

export async function removeDiscountFromCategory(
	fastify: FastifyInstance,
	categoryIds: number[]
) {
	return fastify.prisma.product.updateMany({
		where: {
			categoryId: {
				in: categoryIds,
			},
		},
		data: {
			isDiscounted: false,
			discountPercent: 0,
		},
	});
}

export async function createProduct(fastify: FastifyInstance, data: any) {
	return fastify.prisma.product.create({ data });
}

export async function deleteProduct(fastify: FastifyInstance, id: number) {
	return fastify.prisma.product.delete({ where: { id } });
}
