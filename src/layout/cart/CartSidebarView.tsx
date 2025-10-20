"use client";

import Link from "next/link";
import { useCartViewModel } from "./CartViewModel";

export default function CartSidebarView() {
  const {
    isOpen,
    items,
    totalItems,
    totalPrice,
    setQuantity,
    removeItem,
    changeOptions,
    close,
  } = useCartViewModel();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0  bg-opacity-20 backdrop-blur-sm"
        onClick={() => close()}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={() => close()}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {/* Size selector */}
                        <select
                          value={item.selectedSize}
                          onChange={(e) =>
                            changeOptions(
                              item.id,
                              e.target.value,
                              item.selectedColor
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                        >
                          {item.product.sizes.map((size) => (
                            <option key={size} value={size}>
                              Size: {size}
                            </option>
                          ))}
                        </select>

                        {/* Color selector */}
                        <select
                          value={item.selectedColor}
                          onChange={(e) =>
                            changeOptions(
                              item.id,
                              item.selectedSize,
                              e.target.value
                            )
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                        >
                          {item.product.colors.map((color) => (
                            <option key={color} value={color}>
                              Color: {color}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-medium text-gray-900">
                          ${item.product.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => close()}
                  className="block w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md text-center font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => close()}
                  className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
