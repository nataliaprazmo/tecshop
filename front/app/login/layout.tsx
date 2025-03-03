'use client';
import { CartProvider } from "@/context/CartContext";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>{children}</CartProvider>
  );
}
