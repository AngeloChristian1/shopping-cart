import useCart from "../hooks/useCart"
import '../App.css'

type PropsType = {
    viewCart: boolean,
}

const Footer = ({viewCart}: PropsType)=>{
    const {totalItems, totalPrice}= useCart()
    const year: number = new Date().getFullYear()

    const pageContent = viewCart ?
    <p>Shopping Cart &copy; {year} <span>Angelo Christian </span>. All rights reserved</p>:(
        <>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <p>Shopping Cart &copy; {year}</p>
        </>
    )

    const content =(
        <footer className="footer">
            {pageContent}

        </footer>
    )

    return content
    
}

export default Footer