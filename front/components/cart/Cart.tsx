"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Loader, Trash2 } from "react-feather";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useState } from "react";
import globalState from "@/lib/globalState";
import ClearCartModal from "./ClearCartModal";

const Cart: React.FC = () => {
	const { items, totalItems, totalPrice, clearCart } = useCart();
	const [isClearing, setIsClearing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const microinteractionsOn = globalState.microinteractionsEnabled;

	const clearCartActions = () => {
		setIsClearing(true);
		setTimeout(() => {
			clearCart();
			setIsClearing(false);
			setIsLoading(true);

			// Simulate network delay
			setTimeout(() => {
				setIsLoading(false);
			}, 1500);
		}, 500);
	};

	const handleClearCart = () => {
		if (microinteractionsOn) {
			setIsModalOpen(true);
		} else {
			if (window.confirm("Czy na pewno chcesz wyczyścić koszyk?")) {
				clearCartActions();
			}
		}
	};

	const confirmClearCart = () => {
		setIsModalOpen(false);
		clearCartActions();
	};

	if (isLoading && microinteractionsOn) {
		return (
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<Loader className="animate-spin text-primary" size={64} />
				<p className="text-2xl font-semibold mt-4">
					Czyszczenie koszyka...
				</p>
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<div className="w-full px-20 py-8 h-screen">
				<h1 className="text-4xl font-bold mb-16">
					Koszyk{" "}
					{microinteractionsOn && (
						<span className="text-xl text-gray-700 font-normal ml-1">
							(0 produktów)
						</span>
					)}
				</h1>
				<p className="text-2xl font-semibold mb-4">
					Twój koszyk jest pusty
				</p>
				<Link
					href="/products"
					className="relative text-xl rounded-xl font-bold transition-colors cursor-pointer bg-gradient-to-r from-primary to-secondary border-2 text-transparent bg-clip-text hover:from-secondary hover:to-primary"
				>
					Powrót do zakupów
					<span className="absolute w-full h-0.5 bg-gradient-to-r from-primary to-secondary -bottom-1.5 left-0 rounded-full"></span>
				</Link>
			</div>
		);
	}

	return (
		<>
			{microinteractionsOn && (
				<ClearCartModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onConfirm={confirmClearCart}
				/>
			)}
			<div
				className={`
                w-full px-20 py-8 min-h-screen 
                transition-all duration-500 
                ${
					isClearing && microinteractionsOn
						? "opacity-0 scale-90"
						: "opacity-100 scale-100"
				}
            `}
			>
				<div className="w-full max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-10">
						<h1 className="text-4xl font-bold mb-16">
							Koszyk{" "}
							{microinteractionsOn && (
								<span className="text-xl text-gray-700 font-normal ml-1">
									({totalItems} produkty)
								</span>
							)}
						</h1>
						<button
							onClick={handleClearCart}
							className={`flex items-center gap-2 font-bold ${
								microinteractionsOn &&
								"text-primary hover:text-indigo-800"
							}`}
							disabled={isClearing}
						>
							<span>Wyczyść koszyk</span>
							<Trash2 size={18} />
						</button>
					</div>

					<div
						className={`
                        bg-white rounded-lg shadow-lg p-8 border border-gray-100
                        transition-all duration-500 
						${
							microinteractionsOn &&
							(isClearing
								? "opacity-0 translate-y-10"
								: "opacity-100 translate-y-0")
						}
                    `}
					>
						<div className="flex flex-col gap-8">
							{items.map((item) => (
								<div
									key={item.id}
									className={`
                                    pb-8 border-b border-gray-200 last:border-b-0
                                    transition-all duration-500
                                    ${
										microinteractionsOn &&
										(isClearing
											? "opacity-0 scale-90"
											: "opacity-100 scale-100")
									}
                                `}
								>
									<CartItem cartItem={item} />
								</div>
							))}
						</div>

						<div
							className={`
                            mt-10 flex justify-end items-center gap-4
                            transition-all duration-500
                            ${
								microinteractionsOn &&
								(isClearing
									? "opacity-0 translate-y-5"
									: "opacity-100 translate-y-0")
							}
                        `}
						>
							<p className="text-xl font-medium">suma:</p>
							<p
								className={`text-4xl font-bold ${
									microinteractionsOn && "text-primary"
								}`}
							>
								{totalPrice.toFixed(2)}zł
							</p>
						</div>

						<div
							className={`
                            mt-8 flex justify-between
                            transition-all duration-500
                            ${
								microinteractionsOn &&
								(isClearing
									? "opacity-0 translate-y-5"
									: "opacity-100 translate-y-0")
							}
                        `}
						>
							<Link
								href="/products"
								className={`relative text-xl rounded-xl font-bold ${
									microinteractionsOn &&
									"transition-colors cursor-pointer bg-gradient-to-r from-primary to-secondary border-2 text-transparent bg-clip-text hover:from-secondary hover:to-primary"
								}`}
							>
								Kontynuuj zakupy
								{microinteractionsOn && (
									<span className="absolute w-full h-0.5 bg-gradient-to-r from-primary to-secondary bottom-0.5 left-0 rounded-full"></span>
								)}
							</Link>
							<Link href="/checkout">
								<Button>Dostawa i płatność</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Cart;
