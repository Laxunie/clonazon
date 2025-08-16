import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch, type RootState } from '../../store/store';
import type { Product } from '../../utils/fakeProducts';
import { fetchProducts } from '../../store/productsSlice';

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const productId = window.location.pathname.split('/')[1];

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    
    const foundProduct = products.find((p: Product) => p.id === productId);
    setProduct(foundProduct || null);
  }, [dispatch, products.length, products, productId]);
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <div>
      {product ? (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}

export default ProductPage
// rawr xd
// if(ricky <3 hannah){
//   return true
// }
// if (ricky <3 hannah){
//   return marriage
// }
// else {
//   return </3
// }

// const isInLove = (ricky: string, hannah: string) => {
//   return ricky < 3 && hannah;
// };

// for (let i = 0; i < 1000000; i++) {
//   console.log("I love you, Hannah! I owe u " + (1000000 - i) + " kisses");
// }