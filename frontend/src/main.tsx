import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { ProductPage } from './pages/index.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Navbar from './components/navbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/:id" element={<ProductPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
