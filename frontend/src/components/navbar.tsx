import React, { useState } from 'react'
import { type RootState } from '../store/store';
import { useSelector } from 'react-redux';
import Cart from './cart';
import Modal from './modal';
import Login from './login';
import SignUp from './signup';

const Navbar = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = React.useState(true);

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    }

    const handleCartClick = () => {
        setShowCart(!showCart);
    }

    const handleSignInClick = () => {
        setSignInModalOpen(true);
    }

    const handleModalClose = () => {
        setIsLogin(true)
        setSignInModalOpen(false);
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
            <Modal isOpen={signInModalOpen} onClose={handleModalClose}>
                {isLogin ? <Login toggleAuthMode={toggleAuthMode} /> : <SignUp toggleAuthMode={toggleAuthMode}/>}
            </Modal>
        </div>
    )
}

export default Navbar