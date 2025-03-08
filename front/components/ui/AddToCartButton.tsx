"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, ShoppingCart } from "react-feather";
import { useCart } from "@/context/CartContext";
import { ProductDetailsProps } from "@/types";

interface AddToCartButtonProps {
	product: ProductDetailsProps;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { addItem } = useCart();
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const cartItem = {
			id: product.id,
			productId: product.id,
			quantity: quantity,
			product: {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.isDiscounted
					? product.price * (1 - product.discountPercent / 100)
					: product.price,
				imagePath: product.imagePath,
				isDiscounted: product.isDiscounted,
				discountPercent: product.discountPercent,
			},
		};
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			await addItem(cartItem);
			console.log(
				`Adding product ${product.id} to cart with quantity ${quantity}`
			);

			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Failed to add item to cart", error);
		} finally {
			setQuantity(1);
			setIsHovered(false);
			setIsLoading(false);
		}
	};

	const incrementQuantity = () => {
		setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 9)); // Limit to max 9
	};
	const decrementQuantity = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Limit to min 1
	};

	if (isLoading) {
		return (
			<div className="relative transition-all px-6 w-46 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold flex gap-2 items-center justify-center">
				Dodano
				<Check className="mr-2" size={20} />
			</div>
		);
	}

	return (
		<div
			className="relative transition-all px-6 w-46 h-10 rounded-xl cursor-pointer bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary text-white font-bold flex gap-2 items-center justify-center"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered ? (
				<>Dodaj do koszyka</>
			) : (
				<div className="flex items-center justify-between w-full">
					<div className="flex">
						<input
							type="text"
							value={quantity}
							readOnly
							className="w-4"
						/>
						<div className="flex flex-col">
							<span className="cursor-pointer -mb-1.5 bg-transparent w-2 aspect-square">
								<ChevronUp
									onClick={incrementQuantity}
									size={16}
								/>
							</span>
							<span className="cursor-pointer hover:stroke-3 bg-transparent w-2 aspect-square">
								<ChevronDown
									onClick={decrementQuantity}
									size={16}
								/>
							</span>
						</div>
					</div>
					<div className="w-0.5 h-10 rounded-full ml-3 mr-2 bg-white relative"></div>
					<div className="flex items-center gap-2">
						<p>Dodaj</p>
						<ShoppingCart size={20} />
					</div>
					<button
						onClick={handleAddToCart}
						className="absolute right-0 h-10 w-30 cursor-pointer"
					></button>
				</div>
			)}
		</div>
	);
}
