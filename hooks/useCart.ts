import { CartContext } from "@/context/CartContext"
import { useContext } from "react"

export const useCart = () => {
    const cartContext = useContext(CartContext);
    if (!cartContext) throw new Error('useCart must be used within a CartProvider')
    
    return cartContext;
}