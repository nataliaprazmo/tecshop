'use client';

import { ProductDetailsProps } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "react-feather";

interface CartItemProp {
    cartItem: ProductDetailsProps
}

const CartItem:React.FC<CartItemProp> = ({cartItem}) => {
    const discountedPrice =
        cartItem.isDiscounted && cartItem.discountPercent
        ? cartItem.price * (1 - cartItem.discountPercent / 100)
        : cartItem.price;

    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 9)); // Limit to max 9
    };
    const decrementQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Limit to min 1
    }
    return (
        <div className="flex items-start justify-between w-full">
            <div className="flex">
                <Image src={cartItem.imagePath} alt={cartItem.name} width={120} height={120} className="border border-gray-300 rounded-lg shadow-sm"/>
                <div className="ml-8 ">
                    <h3 className="text-3xl font-bold mb-2">{cartItem.name}</h3>
                    <p className="text-xl text-gray-700">{cartItem.description}</p>
                </div>
            </div>
            <div className="flex">
                <p className="font-bold text-primary text-2xl mr-16">
                    {cartItem.isDiscounted ? (
                        <>
                        <span className="line-through text-gray-400 font-normal text-sm -mb-1">{cartItem.price}zł</span>{" "}
                        {discountedPrice.toFixed(2)}zł</>
                    ) : (
                        `${cartItem.price}zł`
                    )}
                </p>
                <div className="flex gap-1 items-center justify-center mr-6 rounded-lg border border-gray-400 px-6 py-1 ">
                    <input type='text' value={quantity} readOnly className='max-w-4 text-xl'/>
                    <div className='flex flex-col'>
                        <span className="cursor-pointer -mb-1.5 bg-transparent w-2 aspect-square"><ChevronUp onClick={incrementQuantity} size={16}/></span>
                        <span className="cursor-pointer hover:stroke-3 bg-transparent w-2 aspect-square"><ChevronDown onClick={decrementQuantity} size={16}/></span>
                    </div>
                </div>
                <button className="cursor-pointer hover:bg-gray-200 p-1 rounded-lg">
                    <Trash2 size={32}/>
                </button>
            </div>
            
        </div>
    );
}

export default CartItem;