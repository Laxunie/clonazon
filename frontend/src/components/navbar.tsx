import React, { useState } from 'react'
import { type RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './cart';
import Modal from './modal';
import Login from './login';
import SignUp from './signup';
import { logout } from '../store/userSlice';

const Navbar = () => {
    const { cart, user } = useSelector((state: RootState) => ({
        cart: state.cart,
        user: state.user.user,
    }));
    const dispatch = useDispatch();
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

    const handleLogout = () => {
        dispatch(logout());
        // optionally call backend logout (invalidate refresh token)
    };
    
    return (
        <div className='m-4 flex justify-between'>
            <h1>Clonazon</h1>
            <div className='flex gap-10'>
                {user ? (
                    <div className="flex gap-4 items-center">
                        <span>Hi, {user.firstName}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
                        Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <button onClick={handleSignInClick}>Sign in</button>
                    </div>
                )}
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