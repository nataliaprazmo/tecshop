'use client';
import Products from "@/components/products_list/Products";
import { useParams } from "next/navigation";

export default function ProductsByCategoryPage() {
    const params = useParams();
    const { categoryId } = params;
    if (!categoryId) return <div>Ładowanie...</div>;
    return <Products categoryId={categoryId as string} />
}