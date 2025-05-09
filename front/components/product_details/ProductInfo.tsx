"use client";
import { ProductDetailsProps } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import DetailsAccordion from "./DetailsAccordion";
import { useCart } from "@/context/CartContext";
import globalState from "@/lib/globalState";
import Details from "./Details";
import AddedCheckmark from "../ui/AddedCheckmark";

const ProductInfo: React.FC<ProductDetailsProps> = ({
	id,
	name,
	price,
	imagePath,
	description,
	details,
	categoryId,
	manufacturer,
	model,
	isDiscounted,
	discountPercent,
	processor,
	graphicsCard,
	operatingSystem,
	batteryLife,
	screenSize,
	connectivity,
}) => {
	const finalPrice =
		isDiscounted && discountPercent
			? (price * (1 - discountPercent / 100)).toFixed(2)
			: price;
	const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
	const [categoryName, setCategoryName] = useState("produkt");
	const { addItem } = useCart();
	const [isLoading, setIsLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const cartItem = {
			id: id,
			productId: id,
			quantity: quantity,
			product: {
				id: id,
				name: name,
				description: description,
				price: isDiscounted
					? price * (1 - discountPercent / 100)
					: price,
				imagePath: imagePath,
				isDiscounted: isDiscounted,
				discountPercent: discountPercent,
			},
		};
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			await addItem(cartItem);
			console.log(
				`Adding product ${id} to cart with quantity ${quantity}`
			);

			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Failed to add item to cart", error);
		} finally {
			setQuantity(1);
			setIsLoading(false);
		}
	};

	const incrementQuantity = () => {
		setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 9)); // Limit to max 9
	};
	const decrementQuantity = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Limit to min 1
	};

	const toggleAccordion = (index: number) => {
		setActiveAccordion(activeAccordion === index ? null : index);
	};

	const accordionDetails = [
		{
			title: "Szczegóły produktu",
			content: details,
		},
		{
			title: "Producent",
			content: `
            Producent: ${manufacturer}\nModel: ${model}
          `,
		},
		{
			title: "Specyfikacje techniczne",
			content: [
				processor && `Procesor: ${processor}`,
				graphicsCard && `Karta graficzna: ${graphicsCard}`,
				operatingSystem && `System operacyjny: ${operatingSystem}`,
				batteryLife && `Czas pracy baterii: ${batteryLife}`,
				screenSize && `Rozmiar ekranu: ${screenSize}`,
				connectivity && `Łączność: ${connectivity}`,
			]
				.filter(Boolean)
				.join("\n"),
		},
	];

	useEffect(() => {
		const getCategoryName = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/categories/" + categoryId,
					{
						method: "GET",
					}
				);
				if (response.status === 200) {
					const res = await response.json();
					setCategoryName(res.category.name);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getCategoryName();
	}, [categoryId]);

	return (
		<div className="flex flex-col justify-between items-start h-full">
			<div className="w-full mb-4">
				<div className="flex justify-between items-start mb-2">
					<h1 className="text-3xl font-bold text-gray-900">
						{name}
						{isDiscounted &&
							globalState.microinteractionsEnabled && (
								<span className="text-base text-red-600 uppercase align-middle ml-3 px-2 py-0.5 border border-red-300 bg-red-50 rounded-sm">
									-{discountPercent}%
								</span>
							)}
					</h1>
					<p
						className={`text-3xl font-bold ${
							globalState.microinteractionsEnabled &&
							"text-primary"
						}`}
					>
						{isDiscounted ? (
							<>
								<span className="line-through text-gray-400 font-normal text-sm -mb-1">
									{price}zł
								</span>{" "}
								{finalPrice}zł
							</>
						) : (
							`${price}zł`
						)}
					</p>
				</div>
				<span className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700">
					{categoryName}
				</span>
				<p className="text-gray-700 mt-4">{description}</p>
				<div className="mt-6 flex items-center gap-4">
					<div className="flex border border-gray-300 rounded-md">
						<button
							onClick={decrementQuantity}
							className="px-3 py-2 text-gray-600 hover:bg-gray-100"
						>
							-
						</button>
						<input
							type="text"
							value={quantity}
							readOnly
							className="w-12 text-center border-x border-gray-300"
						/>
						<button
							onClick={incrementQuantity}
							className="px-3 py-2 text-gray-600 hover:bg-gray-100"
						>
							+
						</button>
					</div>
					{isLoading && globalState.microinteractionsEnabled ? (
						<AddedCheckmark />
					) : (
						<Button onClick={handleAddToCart}>
							Dodaj do koszyka
						</Button>
					)}
				</div>
			</div>
			{globalState.microinteractionsEnabled ? (
				<div className="border-t border-gray-200 w-full">
					{accordionDetails.map((detail, index) => (
						<DetailsAccordion
							key={index}
							title={detail.title}
							content={detail.content}
							isOpen={activeAccordion === index}
							onClick={() => toggleAccordion(index)}
						/>
					))}
				</div>
			) : (
				<div className="w-full mt-4">
					{accordionDetails.map((detail, index) => (
						<Details
							key={index}
							title={detail.title}
							content={detail.content}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductInfo;
