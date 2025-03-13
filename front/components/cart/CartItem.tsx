"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "react-feather";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import globalState from "@/lib/globalState";

interface CartItemProp {
	cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProp> = ({ cartItem }) => {
	const { updateQuantity, removeItem } = useCart();
	const [quantity, setQuantity] = useState(cartItem.quantity);
	const [isRemoving, setIsRemoving] = useState(false);
	const product = cartItem.product;
	const microinteractionsOn = globalState.microinteractionsEnabled;

	useEffect(() => {
		setQuantity(cartItem.quantity);
	}, [cartItem.quantity]);

	const discountedPrice =
		product.isDiscounted && product.discountPercent
			? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
			: product.price;

	const incrementQuantity = () => {
		const newQuantity = Math.min(quantity + 1, 9); // Limit to max 9
		setQuantity(newQuantity);
		updateQuantity(cartItem.id, newQuantity);
	};

	const decrementQuantity = () => {
		const newQuantity = Math.max(quantity - 1, 1); // Limit to min 1
		setQuantity(newQuantity);
		updateQuantity(cartItem.id, newQuantity);
	};

	const handleRemoveItem = () => {
		setIsRemoving(true);
		setTimeout(() => {
			removeItem(cartItem.id);
		}, 500);
	};

	return (
		<div
			className={`
            p-1 flex items-start justify-between w-full border-indigo-200 rounded-lg ${
				microinteractionsOn &&
				"hover:bg-indigo-50 hover:border hover:scale-105 transition-all duration-300 "
			}
            ${
				microinteractionsOn &&
				(isRemoving
					? "transform translate-x-full opacity-0 scale-75"
					: "translate-x-0 opacity-100")
			}
        `}
		>
			<Link
				href={`/products/details/${product.id}`}
				className="flex relative"
			>
				<Image
					src={product.imagePath}
					alt={product.name}
					width={120}
					height={120}
					className="border border-gray-300 rounded-lg shadow-sm aspect-square object-cover transition-all"
				/>
				<div className="ml-8 ">
					<h3 className="text-3xl font-bold mb-2">
						{product.name}
						{product.isDiscounted && microinteractionsOn && (
							<span className="text-sm text-red-600 uppercase align-middle ml-3 px-2 py-0.5 border border-red-300 bg-red-50 rounded-sm">
								-{product.discountPercent}%
							</span>
						)}
					</h3>
					<p className="text-xl text-gray-700">
						{product.description}
					</p>
				</div>
			</Link>
			<div className="flex">
				<p
					className={`font-bold text-2xl mr-16 ${
						microinteractionsOn && "text-primary"
					}`}
				>
					{product.isDiscounted ? (
						<>
							<span className="line-through text-gray-400 font-normal text-sm -mb-1">
								{product.price}zł
							</span>{" "}
							{discountedPrice}zł
						</>
					) : (
						`${product.price}zł`
					)}
				</p>
				<div className="flex gap-1 items-center justify-center mr-6 rounded-lg border border-gray-400 px-6 py-1 ">
					<input
						type="text"
						value={quantity}
						readOnly
						className="max-w-4 text-xl"
					/>
					<div className="flex flex-col">
						<span className="cursor-pointer -mb-1.5 bg-transparent w-2 aspect-square">
							<ChevronUp onClick={incrementQuantity} size={16} />
						</span>
						<span className="cursor-pointer hover:stroke-3 bg-transparent w-2 aspect-square">
							<ChevronDown
								onClick={decrementQuantity}
								size={16}
							/>
						</span>
					</div>
				</div>
				<button
					onClick={handleRemoveItem}
					className={`cursor-pointer text-gray-700 ${
						microinteractionsOn && "hover:bg-indigo-200"
					} p-1 rounded-lg`}
				>
					<Trash2 size={32} strokeWidth={1.5} />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
