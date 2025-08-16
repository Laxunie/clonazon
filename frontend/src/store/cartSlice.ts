import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../utils/fakeProducts";

interface Cart{
    items: Product[],
    totalQuantity: number,
    totalPrice: number
}

const initialState: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
