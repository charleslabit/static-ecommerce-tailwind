// Mock product data for clothing e-commerce
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  sale: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    description:
      "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    category: "Tops",
    subcategory: "T-Shirts",
    brand: "StyleCo",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1583743814966-8936f37f0c3e?w=500",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Gray"],
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    tags: ["casual", "basic", "cotton"],
    featured: true,
    newArrival: false,
    sale: true,
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 89.99,
    description:
      "Classic denim jacket with a vintage wash. Perfect for layering.",
    category: "Outerwear",
    subcategory: "Jackets",
    brand: "DenimWorks",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Blue"],
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    tags: ["denim", "vintage", "casual"],
    featured: true,
    newArrival: true,
    sale: false,
  },
  {
    id: "3",
    name: "High-Waisted Jeans",
    price: 79.99,
    originalPrice: 99.99,
    description: "Comfortable high-waisted jeans with a flattering fit.",
    category: "Bottoms",
    subcategory: "Jeans",
    brand: "FitRight",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500",
    ],
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: ["Blue", "Black", "Light Blue"],
    inStock: true,
    rating: 4.6,
    reviewCount: 156,
    tags: ["jeans", "high-waisted", "comfortable"],
    featured: false,
    newArrival: false,
    sale: true,
  },
  {
    id: "4",
    name: "Summer Dress",
    price: 69.99,
    description: "Light and breezy summer dress perfect for warm weather.",
    category: "Dresses",
    subcategory: "Casual Dresses",
    brand: "SummerStyle",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "Solid Blue", "Solid Pink"],
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
    tags: ["summer", "dress", "floral"],
    featured: true,
    newArrival: true,
    sale: false,
  },
  {
    id: "5",
    name: "Hoodie",
    price: 59.99,
    description: "Cozy hoodie with a relaxed fit. Perfect for casual days.",
    category: "Tops",
    subcategory: "Hoodies",
    brand: "ComfortZone",
    images: [
      "https://nbastore.com.ph/cdn/shop/files/1_9b09b273-598b-4723-8868-468438a529a7_2400x.jpg?v=1727177370",
      "https://nbastore.com.ph/cdn/shop/files/1_9b09b273-598b-4723-8868-468438a529a7_2400x.jpg?v=1727177370",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Navy", "White"],
    inStock: true,
    rating: 4.4,
    reviewCount: 203,
    tags: ["hoodie", "casual", "comfortable"],
    featured: false,
    newArrival: false,
    sale: false,
  },
  {
    id: "6",
    name: "Leather Boots",
    price: 149.99,
    description: "Premium leather boots with a classic design.",
    category: "Shoes",
    subcategory: "Boots",
    brand: "LeatherCraft",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Brown", "Black", "Tan"],
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    tags: ["leather", "boots", "premium"],
    featured: true,
    newArrival: false,
    sale: false,
  },
  {
    id: "7",
    name: "Sneakers",
    price: 89.99,
    originalPrice: 119.99,
    description: "Comfortable sneakers perfect for everyday wear.",
    category: "Shoes",
    subcategory: "Sneakers",
    brand: "StepRight",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Navy", "Red"],
    inStock: true,
    rating: 4.3,
    reviewCount: 145,
    tags: ["sneakers", "casual", "comfortable"],
    featured: false,
    newArrival: false,
    sale: true,
  },
  {
    id: "8",
    name: "Blazer",
    price: 129.99,
    description: "Professional blazer perfect for office or formal occasions.",
    category: "Outerwear",
    subcategory: "Blazers",
    brand: "ProfessionalWear",
    images: [
      "https://cdn-images.farfetch-contents.com/25/67/00/97/25670097_55780987_2048.jpg",
      "https://cdn-images.farfetch-contents.com/25/67/00/97/25670097_55780987_2048.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Gray"],
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    tags: ["blazer", "professional", "formal"],
    featured: false,
    newArrival: true,
    sale: false,
  },
];

export const CATEGORIES = [
  { name: "Tops", slug: "tops", count: 3 },
  { name: "Bottoms", slug: "bottoms", count: 1 },
  { name: "Dresses", slug: "dresses", count: 1 },
  { name: "Outerwear", slug: "outerwear", count: 2 },
  { name: "Shoes", slug: "shoes", count: 2 },
];

export const BRANDS = [
  "StyleCo",
  "DenimWorks",
  "FitRight",
  "SummerStyle",
  "ComfortZone",
  "LeatherCraft",
  "StepRight",
  "ProfessionalWear",
];
