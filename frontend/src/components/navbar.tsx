import React, { useState } from 'react'
import { type RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Cart from './cart';

const Navbar = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [showCart, setShowCart] = useState<boolean>(false);
    const handleCartClick = () => {
        setShowCart(!showCart);
    }
    return (
        <div className='m-4 flex justify-between'>
            <h1>Clonazon</h1>
            <div className='flex gap-10'>
                <button>Sign in</button>
                <div className='flex gap-2'>
                    <h1>Items: {cart.totalQuantity}</h1>
                    <button onClick={handleCartClick}>Cart</button>
                    {showCart && <Cart />}
                </div>
            </div>

        </div>
    )
}

export default Navbar