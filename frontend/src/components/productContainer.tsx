import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { addToCart } from '../store/cartSlice'
import Rating from '@mui/material/Rating';

type Product = {
    id: string
    title: string
    description: string
    price: number
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
}

type ProductCardProps = {
  product: Product;
};
const ProductContainer = ({product}: ProductCardProps) => {

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product)); 
  };

  return (
    <div className='flex flex-col border gap-2 p-2 relative'>
        <Link to={`/${product.id}`} className="absolute inset-0 z-0" />
        <img src={product.image}/>
        <h3 className='font-normal'>{product.title}</h3>
        <h1 className='font-medium'>${product.price}</h1>
        <Rating name="read-only" value={product.rating.rate} readOnly />
        <button onClick={handleAddToCart} className='bg-yellow-400 rounded-lg w-25 z-10'>Add to cart</button>
    </div>
  )
}

export default ProductContainer