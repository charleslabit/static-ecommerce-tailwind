"use client";

import { useToast } from "@/contexts/ToastContext";
import { addToCart, openCart } from "@/features/cart/cartSlice";
import { PRODUCTS } from "@/lib/mockData/products";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";

export function useProductDetailViewModel() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { totalItems } = useAppSelector((state) => state.cart);
  const params = useParams<{ id: string }>();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === params?.id),
    [params]
  );

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize || !selectedColor) {
      showToast("Please select size and color", "error");
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
        selectedSize,
        selectedColor,
      })
    );
    showToast(`${product.name} added to cart!`, "success");
  };

  const openCartSidebar = () => dispatch(openCart());

  return {
    // state
    product,
    totalItems,
    selectedSize,
    selectedColor,
    quantity,
    selectedImage,
    // setters
    setSelectedSize,
    setSelectedColor,
    setSelectedImage,
    // actions
    incrementQuantity,
    decrementQuantity,
    handleAddToCart,
    openCartSidebar,
  } as const;
}
