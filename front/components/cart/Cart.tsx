'use client';

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Trash2 } from "react-feather";
import Link from "next/link";

const Cart:React.FC = () => {
    const { items, totalItems, totalPrice, clearCart } = useCart();

    const handleClearCart = () => {
        if (window.confirm("Czy na pewno chcesz wyczyścić koszyk?")) {
            clearCart();
        }
    };

    if (items.length === 0) {
        return (
            <div className="w-full px-20 py-16 h-screen">
                <h1 className="text-4xl font-bold mb-16">Koszyk <span className="text-xl text-gray-700 font-normal ml-1">(0 produktów)</span></h1>
                <p className="text-2xl font-semibold mb-4">Twój koszyk jest pusty</p>
                <Link href="/products" className="relative text-xl rounded-xl font-bold transition-colors cursor-pointer bg-gradient-to-r from-primary to-secondary border-2 text-transparent bg-clip-text hover:from-secondary hover:to-primary">
                    Powrót do zakupów
                    <span className="absolute w-full h-0.5 bg-gradient-to-r from-primary to-secondary -bottom-1.5 left-0 rounded-full"></span>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full px-20 py-16 min-h-screen">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold mb-16">Koszyk <span className="text-xl text-gray-700 font-normal ml-1">({totalItems} produkty)</span></h1>
                    <button 
                        onClick={handleClearCart}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                        <span>Wyczyść koszyk</span>
                        <Trash2 size={18} />
                    </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
                    <div className="flex flex-col gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="pb-8 border-b border-gray-200 last:border-b-0">
                                <CartItem cartItem={item} />
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-10 flex justify-end items-center gap-4">
                        <p className="text-xl font-medium">suma:</p>
                        <p className="text-4xl font-bold text-blue-600">{totalPrice.toFixed(2)}zł</p>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                        <Link href="/products" className="text-blue-600 font-medium hover:underline">
                            Kontynuuj zakupy
                        </Link>
                        <Link 
                            href="/checkout" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg text-xl"
                        >
                            Dostawa i płatność
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;