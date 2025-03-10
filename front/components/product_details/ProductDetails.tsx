"use client";

import Image from "next/image";
import ProductInfo from "./ProductInfo";
import { ProductDetailsProps } from "@/types";
import { useEffect, useState } from "react";
import { Frown, Loader } from "react-feather";
import globalState from "@/lib/globalState";

interface ProductDetailsComponentProps {
	productId: string;
}

const ProductDetails: React.FC<ProductDetailsComponentProps> = ({
	productId,
}) => {
	const [product, setProduct] = useState<ProductDetailsProps | null>(null);
	const [loading, setLoading] = useState(true);
	const microinteractionsOn = globalState.microinteractionsEnabled;

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					"http://localhost:5000/api/products/" + productId,
					{
						method: "GET",
					}
				);
				if (response.status === 200) {
					const res = await response.json();
					console.log(productId);
					setProduct(res);
				}
			} catch (error) {
				console.error("Error fetching product:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	if (microinteractionsOn && loading) {
		return (
			<div className="container px-20 py-8 text-2xl h-screen">
				<div className="flex gap-4 items-center">
					<Loader className="animate-spin" />
					<p>Ładuję produkt...</p>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="container px-20 py-8 text-2xl h-screen">
				<div className="flex gap-4 items-center">
					{microinteractionsOn && <Frown />}
					<p>Nie znaleziono produktu</p>
				</div>
			</div>
		);
	}
	return (
		<div className="px-20 py-6 grid grid-cols-2 gap-8 items-center">
			<div>
				<Image
					src={product.imagePath}
					alt={product.name}
					width={600}
					height={600}
					className="w-full h-full object-cover rounded-2xl"
				/>
			</div>
			<ProductInfo {...product} />
		</div>
	);
};

export default ProductDetails;
