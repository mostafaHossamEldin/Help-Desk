<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// import '../public/styles/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route  , Router, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Productspage from './pages/productsPage'
import CartPage from "./pages/cartPage";
import Checkout from "./pages/checkoutPage";
import TryParams from "./pages/trySearchParams";
import Login from "./pages/login";
import Signup from "./pages/register";
function App() {
  return (
    <>
        <Routes>
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<Signup/>}/>
          
          <Route path="/" element={<Homepage />} />

          <Route path="/products" element={<Productspage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:id" element={<TryParams />} />




        </Routes>
    </>
  );
}

export default App;
=======
=======
>>>>>>> 84aecd3d3c6eb1fb72c393a6e97846583d81a4b4
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route  , Router, Routes } from "react-router-dom";

import Signup from "./pages/register";

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      
    </Routes>
</>
  )
}

export default App
<<<<<<< HEAD
>>>>>>> 5ca0402fe7c9f530fc3224cfcbbd6e64d53117ff
=======
>>>>>>> 84aecd3d3c6eb1fb72c393a6e97846583d81a4b4
