import { type Product } from '../../utils/fakeProducts'
import ProductContainer from '../../components/productContainer';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
const Home = () => {
    const products = useSelector((state: RootState) => state.products.products);

  return (
    <>
      <div className='grid grid-cols-6 gap-3 m-2'>
        {products.map((product: Product) => {
          return (
            <>
              <ProductContainer key={product.id} product={product} />
            </>
          );
        })}
      </div>
    </>
  )
}

export default Home