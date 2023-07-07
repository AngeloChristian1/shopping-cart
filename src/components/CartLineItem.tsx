import { CartItemType } from '../context/CartProvider'
import { ReducerAction } from '../context/CartProvider'
import { ReducerActionType } from '../context/CartProvider'
import {ReactElement} from 'react'
import {
    
} from 'react'

import '../App.css'

type PropsType={
    item: CartItemType,
    dispatch:React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}:PropsType)=>{

    const lineTotal:number = (item.quantity * item.price)
    const highestQuantity:number = 10 > item.quantity ? 10 :item.quantity
    const optionValues: number[]= [...Array(highestQuantity).keys()].map(i=>i+1)

    const options:ReactElement[] = optionValues.map(val =>{
        return <option key={`opt${val}` }value={val}>{val}</option>
    })

    const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>)=>{
        dispatch({
            type:REDUCER_ACTIONS.QUANTITY,
            payload:{ ...item, quantity:Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type:REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <div className='img'><img src={item.image} alt={item.title} /></div>
            <div className="content"><div>{item.title}</div>
            <div aria-label='Item price'>{new Intl.NumberFormat('en-US',{style:'currency', currency:"USD"}).format(item.price)}</div>
        </div>
            <div className="middle">
            <label htmlFor="itemQuantity " className="offscreen">Item Quantity</label>
            <select name="itemQuantity" id="itemQuantity"
            className='cart__select'
            value={item.quantity}
            aria-label='Item Quantity'
            onChange={onChangeQuantity}
            >{options}</select>

            <div className="cart__item-subtotal" aria-label='Line Item Subtotal'>
            {new Intl.NumberFormat('en-US',{style:'currency', currency:"USD"}).format(lineTotal)}
            </div>
            </div>
          
            <button className="cart__button"
            aria-label='Remove Item from cart'
            title="Remove Item from cart"
            onClick={onRemoveFromCart}
            >
                Remove from Cart
            </button>
        </li>
    )
    return content
  
}

export default CartLineItem