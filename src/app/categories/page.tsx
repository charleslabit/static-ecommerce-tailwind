"use client";

import { CATEGORIES, PRODUCTS } from "@/lib/mockData/products";
import Link from "next/link";

export default function CategoriesPage() {
  const getCategoryProducts = (categorySlug: string) => {
    return PRODUCTS.filter(
      (product) => product.category.toLowerCase() === categorySlug
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Dummy Shop
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                href="/shop"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Shop
              </Link>
              <Link href="/categories" className="text-blue-600 font-medium">
                Categories
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-xl opacity-90">Discover our curated collections</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {CATEGORIES.map((category) => {
            const categoryProducts = getCategoryProducts(category.slug);
            const featuredProduct = categoryProducts[0];

            return (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  {featuredProduct ? (
                    <img
                      src={featuredProduct.images[0]}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">No products</span>
                    </div>
                  )}
                  <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-200" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">
                      {category.count} {category.count === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Categories
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tops Category */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tops</h3>
                <p className="text-gray-600 mb-6">
                  From basic tees to stylish blouses, find the perfect top for
                  any occasion.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {getCategoryProducts("tops")
                    .slice(0, 2)
                    .map((product) => (
                      <div key={product.id} className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <Link
                  href="/shop?category=tops"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Shop Tops
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Shoes Category */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Shoes</h3>
                <p className="text-gray-600 mb-6">
                  Step out in style with our collection of comfortable and
                  fashionable footwear.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {getCategoryProducts("shoes")
                    .slice(0, 2)
                    .map((product) => (
                      <div key={product.id} className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 rounded px-2 py-1">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <Link
                  href="/shop?category=shoes"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Shop Shoes
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All Categories List */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.count} {category.count === 1 ? "item" : "items"}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
