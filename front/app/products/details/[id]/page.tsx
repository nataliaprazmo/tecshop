'use client';
import ProductDetails from "@/components/product_details/ProductDetails";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
    const params = useParams();
    const { id } = params;
    if (!id) return <div>Ładowanie...</div>;
    return <ProductDetails productId={id as string} />
}