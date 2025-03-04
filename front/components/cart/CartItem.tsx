'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "react-feather";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";

interface CartItemProp {
    cartItem: CartItemType;
}

const CartItem:React.FC<CartItemProp> = ({cartItem}) => {
    const { updateQuantity, removeItem } = useCart();
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const product = cartItem.product;

    useEffect(() => {
        setQuantity(cartItem.quantity);
    }, [cartItem.quantity]);

    const discountedPrice =
        product.isDiscounted && product.discountPercent
        ? product.price * (1 - product.discountPercent / 100)
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
        removeItem(cartItem.id);
    };

    return (
        <div className="flex items-start justify-between w-full">
            <div className="flex">
                <Image src={product.imagePath} alt={product.name} width={120} height={120} className="border border-gray-300 rounded-lg shadow-sm"/>
                <div className="ml-8 ">
                    <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                    <p className="text-xl text-gray-700">{product.description}</p>
                </div>
            </div>
            <div className="flex">
                <p className="font-bold text-primary text-2xl mr-16">
                    {product.isDiscounted ? (
                        <>
                        <span className="line-through text-gray-400 font-normal text-sm -mb-1">{product.price}zł</span>{" "}
                        {discountedPrice}zł</>
                    ) : (
                        `${product.price}zł`
                    )}
                </p>
                <div className="flex gap-1 items-center justify-center mr-6 rounded-lg border border-gray-400 px-6 py-1 ">
                    <input type='text' value={quantity} readOnly className='max-w-4 text-xl'/>
                    <div className='flex flex-col'>
                        <span className="cursor-pointer -mb-1.5 bg-transparent w-2 aspect-square"><ChevronUp onClick={incrementQuantity} size={16}/></span>
                        <span className="cursor-pointer hover:stroke-3 bg-transparent w-2 aspect-square"><ChevronDown onClick={decrementQuantity} size={16}/></span>
                    </div>
                </div>
                <button onClick={handleRemoveItem} className="cursor-pointer hover:bg-gray-200 p-1 rounded-lg">
                    <Trash2 size={32}/>
                </button>
            </div>
            
        </div>
    );
}

export default CartItem;