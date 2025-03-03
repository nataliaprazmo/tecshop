'use client';
import { CartProvider } from "@/context/CartContext";

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>{children}</CartProvider>
  );
}
