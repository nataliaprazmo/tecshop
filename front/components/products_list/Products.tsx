'use client';

import { ProductDetailsProps } from "@/types";
import { useState, useEffect } from "react";
import { Frown, Loader } from "react-feather";
import ProductCard from "./ProductCard";


interface Params {
    categoryId?: string;
}

const Products:React.FC<Params> = ({categoryId}) => {
    const [products, setProducts] = useState<ProductDetailsProps[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const route = categoryId ? `http://localhost:5000/api/categories/${categoryId}/products` : "http://localhost:5000/api/products"
        const fetchProduct = async () => {
          try {
            const response = await fetch(
              route,
              {
                method: "GET",
              }
            );
            if (response.status === 200) {
              const res = await response.json();
              setProducts(res);
            }
          } catch (error) {
            console.error("Error fetching product:", error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchProduct();
      }, []);
      
      if (loading) {
        return <div className="container px-20 py-16 text-2xl h-screen">
          <div className="flex gap-4 items-center">
            <Loader className="animate-spin"/> 
            <p>Ładuję produkty...</p>
            </div>
          </div>;
      }
      
      if (!products || products.length == 0) {
        return <div className="container px-20 py-16 text-2xl h-screen">
          <div className="flex gap-4 items-center">
            <Frown />
            <p>Nie znaleziono produktów {categoryId && "z danej kategorii"}</p>
          </div>
          </div>;
      }

    return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-3 xl:gap-x-6 xl:gap-y-8 xl:grid-cols-4 3xl:grid-cols-5 3xl:gap-x-8 3xl:gap-y-10 w-full px-20 py-12">
        {
            products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        }
    </div>
    );
}

export default Products;