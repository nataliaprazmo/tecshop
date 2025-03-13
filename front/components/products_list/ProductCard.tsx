import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../ui/AddToCartButton";
import globalState from "@/lib/globalState";

interface ProductParam {
	product: ProductDetailsProps;
}

const ProductCard: React.FC<ProductParam> = ({ product }) => {
	const discountedPrice =
		product.isDiscounted && product.discountPercent
			? (product.price * (1 - product.discountPercent / 100)).toFixed(2)
			: product.price;
	return (
		<div
			className={`w-full h-fit flex flex-col items-start justify-between ${
				globalState.microinteractionsEnabled &&
				"p-1 hover:scale-105 hover:bg-indigo-50 hover:border hover:border-indigo-300 transition-all hover:rounded-2xl hover:shadow-lg hover:shadow-indigo-300/70 group"
			}`}
		>
			<Link
				href={`/products/details/${product.id}`}
				className="relative rounded-2xl overflow-hidden"
			>
				<Image
					src={product.imagePath}
					alt={product.name}
					width={400}
					height={300}
					className={`aspect-[4/3] object-cover border border-gray-200 rounded-2xl shadow-sm ${
						globalState.microinteractionsEnabled && "cursor-zoom-in"
					}`}
				/>
				<h3 className="mt-3 font-bold text-2xl">
					{product.name}
					{product.isDiscounted &&
						globalState.microinteractionsEnabled && (
							<span className="text-sm text-red-600 uppercase align-middle ml-2 px-2 py-0.5 border border-red-300 bg-red-50 rounded-sm transition-all group-hover:shadow group-hover:shadow-red-500/40 group-hover:border-red-400">
								-{product.discountPercent}%
							</span>
						)}
				</h3>
				<p className="text-base text-gray-700 mt-2 line-clamp-2 h-16">
					{product.description}
				</p>
			</Link>
			<div className="flex justify-between items-center w-full">
				<p
					className={`font-bold text-lg 1xl:text-xl flex flex-col ${
						globalState.microinteractionsEnabled && "text-primary"
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
				<AddToCartButton key={product.id} product={product} />
			</div>
		</div>
	);
};

export default ProductCard;
