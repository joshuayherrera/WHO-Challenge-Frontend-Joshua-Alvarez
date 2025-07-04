import { Product, ApiResponse } from "@/types";

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch('https://dummyjson.com/products');

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: ApiResponse = await res.json();
        return data.products;
        
    } catch (err) {
        console.error(err)
        throw new Error('Could not fetch products.')
    }
}

export async function getProductById(id: number): Promise<Product> {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if(!res.ok) {
            throw new Error(`Failed to fetch data by id`);
        }

        return res.json();

    } catch (err) {
        console.error(err);
        throw new Error(`Could not fetch the product with the id: ${id}`)
    }
}