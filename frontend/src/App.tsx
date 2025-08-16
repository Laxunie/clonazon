import { useSelector } from 'react-redux';
import { Home } from './pages'
import { useEffect } from 'react';
import { fetchProducts } from './store/productsSlice';
import { useAppDispatch, type RootState } from './store/store';

function App() {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <Home/>
  )
}

export default App
