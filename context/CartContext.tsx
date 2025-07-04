'use client';

import { createContext, useReducer, ReactNode, useEffect, Dispatch } from "react";
import { CartItem, Product } from "@/types";

// Acciones para el carrito
type Action = 
    | {type: 'ADD_ITEM'; payload: Product}
    | {type: 'REMOVE_ITEM'; payload: number}
    | {type: 'UPDATE_QUANTITY'; payload: {id: number; quantity: number}}
    | {type: 'SET_CART'; payload: CartItem[]};


interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

// Toda la logica del carrito
const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item => 
                        item.id === action.payload.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                    )
                }
            }
            return {
                ...state,
                items: [...state.items, {...action.payload, quantity: 1}]
            }
        }

        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            }
        }

        case "UPDATE_QUANTITY": {
            const { id, quantity } = action.payload;

            if(quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== id)
                }
            }

            return {
                ...state,
                items: state.items.map(item => 
                    item.id === id
                    ? { ...item, quantity}
                    : item
                )
            }
        }

        case "SET_CART": {
            return {
                ...state,
                items:action.payload
            }
        }

        default:
            return state;
    }
}

// Crear el contexto
export const CartContext = createContext<{
    state: CartState;
    dispatch: Dispatch<Action>;
} | null>(null);

// Crear el Provider
export const CartProvider = ({ children } : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            if(storedCart) {
                dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart)})
            }
        } catch (err) {
            console.error("Failed to parese cart from localStorage", err);
        }
    }, []);

    useEffect(() => {
        if (state.items.length > 0 || localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify(state.items))
        }
    },[state.items])

    return (
        <CartContext.Provider value={{ state, dispatch}} >
            {children}
        </CartContext.Provider>
    )
}