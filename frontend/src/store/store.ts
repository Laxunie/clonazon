import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';
// ...

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch