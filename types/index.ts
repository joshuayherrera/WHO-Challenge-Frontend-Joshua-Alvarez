export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}