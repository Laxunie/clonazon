import React, { useState } from 'react'
import { type RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Cart from './cart';
import Modal from './modal';

const Navbar = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
    
    const handleCartClick = () => {
        setShowCart(!showCart);
    }

    const handleSignInClick = () => {
        setSignInModalOpen(true);
    }

    return (
        <div className='m-4 flex justify-between'>
            <h1>Clonazon</h1>
            <div className='flex gap-10'>
                <button onClick={handleSignInClick}>Sign in</button>
                <div className='flex gap-2'>
                    <h1>Items: {cart.totalQuantity}</h1>
                    <button onClick={handleCartClick}>Cart</button>
                    {showCart && <Cart />}
                </div>
            </div>
            <Modal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} title="Sign In">
                <div>
                    <h1>Sign In</h1>
                </div>
            </Modal>
        </div>
    )
}

export default Navbar