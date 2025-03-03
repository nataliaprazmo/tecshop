import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { categories } from "./categories";
import { users } from "./users";
import { products } from "./products";
dotenv.config();
const prisma = new PrismaClient();

async function seed() {
	for (const name of categories) {
		await prisma.category.create({
            data: {name}
		});
	}
	console.log("Kategorie dodane.");

  // Dodanie użytkowników
  for (const user of users) {
    const newUser = await prisma.user.create({ data: user });
    await prisma.cart.create({ data: { userId: newUser.id } });
  }
  console.log("Użytkownicy dodani.");

  // Dodanie produktów
  const createdProducts = [];
  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { id: product.categoryId } });
    if (category) {
      const discountPercent =
        category.name === 'smartwatch' ? 10 :
        category.name === 'słuchawki bezprzewodowe' ? 25 :
        undefined;

      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          imagePath: product.imagePath,
          isDiscounted: discountPercent !== undefined,
          discountPercent: discountPercent,
          manufacturer: product.manufacturer,
          model: product.model,
		      details: product.details,
          batteryLife: product.batteryLife,
          connectivity: product.connectivity,
          processor: product.processor,
          operatingSystem: product.operatingSystem,
          screenSize: product.screenSize,
          categoryId: category.id,
        },
      });
      createdProducts.push(newProduct);
    }
  }
  console.log("Produkty dodane.");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
