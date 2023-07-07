// import ProductProvider from './context/ProductsProvider'
import './App.css'
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Header from './components/Header';

import {useState, useEffect} from 'react'


function App() {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(data);

  const [viewCart, setViewCart] = useState<boolean>(false)

  const pageContent = viewCart ? <Cart />:<ProductList/>

  const content =(
    <>
    <Header viewCart = {viewCart} setViewCart={setViewCart}/>
    {pageContent}
    
    <Footer viewCart = {viewCart} />
    
    </>
  )
  return content
  return (
    <>
     <div className="App">

     </div>
    </>
  )
}

export default App
