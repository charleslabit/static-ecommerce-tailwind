"use client";

import { useToast } from "@/contexts/ToastContext";
import { addToCart, openCart } from "@/features/cart/cartSlice";
import { CATEGORIES, PRODUCTS } from "@/lib/mockData/products";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useState } from "react";

export function useShopViewModel() {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.cart);
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.newArrival ? 1 : -1;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedSize: product.sizes[0],
        selectedColor: product.colors[0],
      })
    );
    showToast(`${product.name} added to cart!`, "success");
  };

  const openCartSidebar = () => dispatch(openCart());

  return {
    // State
    totalItems,
    selectedCategory,
    sortBy,
    priceRange,
    categories: CATEGORIES,
    products: sortedProducts,

    // Setters
    setSelectedCategory,
    setSortBy,
    setPriceRange,

    // Actions
    handleAddToCart,
    openCartSidebar,
  } as const;
}
