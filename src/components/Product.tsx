import '../App.css'
import { ProductType } from '../context/ProductsProvider'
import { ReducerAction, ReducerActionType } from '../context/CartProvider'
import {ReactElement} from 'react'


type PropsType ={
    product:ProductType,
    dispatch:  React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const Product = ({product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement=>{
 
 const onAddToCart =() =>dispatch({type:REDUCER_ACTIONS.ADD, payload: {...product, quantity:1}})

const itemInCart =inCart ? 'Item in cart' :null

const content = (
    <article className="product">
        
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>{new Intl.NumberFormat('en-US',{style:'currency', currency:"USD"}).format(product.price)}</p>
        <button onClick={onAddToCart}>Add To Cart</button>
    </article>
)
 return content
}

export default Product