import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { generateFakeProducts, type Product } from '../utils/fakeProducts';

interface ProductsState {
    products: Product[],
    loading: boolean,
    error: string | null
}


const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call or fetch from localStorage
    let products = JSON.parse(localStorage.getItem('products') || 'null');
    if (!products) {
      products = generateFakeProducts(18);
      localStorage.setItem('products', JSON.stringify(products));
    }
    return products as Product[];
  }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const exists = state.products.some(p => p.id === action.payload.id);
            if (!exists) {
                state.products.push(action.payload);
            }
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch products';
        });
    },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
