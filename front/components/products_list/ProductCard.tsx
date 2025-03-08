import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../ui/AddToCartButton";

interface ProductParam {
	product: ProductDetailsProps;
}

const ProductCard: React.FC<ProductParam> = ({ product }) => {
	const discountedPrice =
		product.isDiscounted && product.discountPercent
			? product.price * (1 - product.discountPercent / 100)
			: product.price;
	return (
		<div className="w-full h-fit flex flex-col items-start justify-between">
			<div className="relative">
				<Link href={`/products/details/${product.id}`}>
					<Image
						src={product.imagePath}
						alt={product.name}
						width={400}
						height={400}
						className="object-contain hover:scale-105 transition-all border border-gray-200 rounded-2xl shadow-sm hover:brightness-50"
					/>
					{product.isDiscounted && (
						<span className="absolute rounded-full p-2 aspect-square text-center content-center border border-gray-200 shadow-sm bg-white font-bold text-primary right-4 top-4">
							-{product.discountPercent}%
						</span>
					)}
				</Link>
				<h3 className="mt-3 font-bold text-2xl">{product.name}</h3>
				<p className="text-base text-gray-700 mt-2 line-clamp-2 h-16">
					{product.description}
				</p>
			</div>
			<div className="flex justify-between items-center w-full">
				<p className="text-primary font-bold text-xl flex flex-col">
					{product.isDiscounted ? (
						<>
							<span className="line-through text-gray-400 font-normal text-sm -mb-1">
								{product.price}zł
							</span>{" "}
							{discountedPrice.toFixed(2)}zł
						</>
					) : (
						`${product.price}zł`
					)}
				</p>
				<AddToCartButton key={product.id} product={product} />
			</div>
		</div>
	);
};

export default ProductCard;
