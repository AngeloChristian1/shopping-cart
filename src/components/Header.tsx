import Nav from "./Nav"
import '../App.css'
import useCart from "../hooks/useCart"
type PropsType ={
    viewCart : boolean,
    setViewCart:  React.Dispatch<React.SetStateAction<boolean>>
    
}

const Header = ({viewCart, setViewCart}: PropsType)=>{
    const {totalItems, totalPrice} = useCart()
    const content = (
        <header className="header">
            <hr></hr>
            <div className="header__title-bar">
                <h1>.Shopping Cart</h1>
              </div>   
                <div className="header__price-box">
                    <p>Total Items:{totalItems}</p>
                    <p>Total Price: {totalPrice}</p>
                </div>
                
           
            <Nav viewCart={viewCart} setViewCart={setViewCart}/>
            <hr></hr>
        </header>
    )
    return content
    return(
        <div></div>
    )
}

export default Header