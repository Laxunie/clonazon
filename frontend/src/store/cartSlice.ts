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
            state.totalPrice += parseFloat(action.payload.price.toFixed(2));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.items.splice(itemIndex, 1);
                state.totalQuantity -= 1;
                state.totalPrice -= item.price;
            }
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
