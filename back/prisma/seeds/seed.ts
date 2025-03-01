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
  const createdUsers = [];
  for (const user of users) {
    const newUser = await prisma.user.create({ data: user });
    createdUsers.push(newUser);
  }
  console.log("Użytkownicy dodani.");

  // Dodanie produktów
  const createdProducts = [];
  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { id: product.categoryId } });
    if (category) {
      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          imagePath: product.imagePath,
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

  // Dodanie koszyka dla użytkownika 1
  const cart = await prisma.cart.create({ data: { userId: createdUsers[0].id } });
  await prisma.cartItem.create({ data: { cartId: cart.id, productId: createdProducts[0].id, quantity: 1 } });
  await prisma.cartItem.create({ data: { cartId: cart.id, productId: createdProducts[1].id, quantity: 1 } });
  console.log("Koszyk użytkownika 1 utworzony.");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
