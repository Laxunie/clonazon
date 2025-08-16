import React from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
  return (
    <div className='fixed right-0 top-10 w-1/4 h-full bg-white shadow-lg p-4 z-100'>
        <h2 className='text-lg font-bold mb-4'>Shopping Cart</h2>
        <div className='flex flex-col gap-4'>
            {cart.items.map(item => (
            <div key={item.id} className='flex justify-between'>
                <span>{item.title}</span>
                <span>{item.price}</span>
            </div>
            ))}
        </div>
        <div className='mt-4'>
            <h3 className='font-bold'>Total: ${cart.totalPrice}</h3>
            <h3 className='font-bold'>Items: {cart.totalQuantity}</h3>
        </div>
    </div>
  )
}

export default Cart