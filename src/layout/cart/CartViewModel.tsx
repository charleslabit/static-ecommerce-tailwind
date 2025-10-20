"use client";

import {
  closeCart,
  openCart,
  removeFromCart,
  updateItemOptions,
  updateQuantity,
} from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";

export function useCartViewModel() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const setQuantity = (id: string, quantity: number) =>
    dispatch(updateQuantity({ id, quantity }));

  const removeItem = (id: string) => dispatch(removeFromCart(id));

  const changeOptions = (
    id: string,
    selectedSize: string,
    selectedColor: string
  ) => dispatch(updateItemOptions({ id, selectedSize, selectedColor }));

  const open = () => dispatch(openCart());
  const close = () => dispatch(closeCart());

  return {
    ...cart,
    setQuantity,
    removeItem,
    changeOptions,
    open,
    close,
  } as const;
}
