import useCart from '../hooks/useCart'
import { useState } from 'react'
import CartLineItem from './CartLineItem'

import '../App.css'

const Cart = ()=>{
    const [confirm, setConfirm] = useState<boolean>(false)
    const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice,cart} =useCart()

    const onSubmitOrder =()=>{
        dispatch({ type: REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }

    const pageContent = confirm ?
        <h2>Thank you for your Order.</h2>:
        <>
        <div className="offscreen">Cart</div>
        <ul className='cart'> 
        {
            cart.map(item =>{
                return(
                    <CartLineItem
                    key={item.id}
                    item = {item}
                    dispatch = {dispatch}
                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                    />
                )
            })
        }
        </ul>
        <div className="cart_totals">
            <p>Total Items: {totalItems}</p>
            <p>Total Amount: {totalPrice}</p>
            <button className='submitCart' disabled={!totalItems} onClick={onSubmitOrder}> Order Now</button>
        </div>
        </>

        const content =(
            <main className="main main-cart">
                {pageContent}
            </main>
        )
    
    return content

}

export default Cart