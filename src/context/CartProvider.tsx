import '../App.css'
import {useReducer, useMemo, createContext, ReactElement} from 'react'

export type CartItemType = {
    id: number,
    category: string,
    image: string,
    price: number,
    title: string,
    description: string,
    quantity: number,
}

type CartStateType = {cart:CartItemType[]}

const initCartState: CartStateType = { cart:[]}

const REDUCER_ACTION_TYPE ={
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT:"SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction ={
    type: string,
    payload?:CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType =>{
    switch(action.type) {
        case REDUCER_ACTION_TYPE.ADD:{
            if (!action.payload){
                throw new Error('action.payload missing in ADD action')
            }
            const {id, image, price, title, description,category} = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id != id)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.id != id)

            const quantity: number = itemExists ? itemExists.quantity + 1 : 1
            return {...state, cart:[...filteredCart,{id,quantity,image,price,title,description,category}]}

        }
        case REDUCER_ACTION_TYPE.REMOVE:{
            if (!action.payload){
                throw new Error('action.payload missing in REMOVE action')
            }
            const {id} = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id != id)

            return {...state,cart:[...filteredCart]}

        }
        case REDUCER_ACTION_TYPE.QUANTITY:{
            if (!action.payload){
                throw new Error('action.payload missing in QUANTITY action')
            }

            const {id, quantity} = action.payload
            
            const itemExists: CartItemType | undefined = state.cart.find(item => item.id != id)

            if (!itemExists){
                throw new Error('Item must exit to update quantity')
            }

            const updatedItem: CartItemType = {...itemExists, quantity}

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id != id)

            return { ...state, cart:[...filteredCart,updatedItem]}

        }
        case REDUCER_ACTION_TYPE.SUBMIT:{
            return{ ...state, cart:[] }

        }
        default:
            throw new Error('reducer action type not known')
    }
}


const useCartContext = (initCartState: CartStateType)=>{
    const [state,dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(()=>{
        return REDUCER_ACTION_TYPE
    },[])

    const totalItems = state.cart.reduce((previousValue,cartItem) => {
        return previousValue + cartItem.quantity
    },0)

    const totalPrice = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(
        state.cart.reduce((previousValue, cartItem)=>{
            return previousValue + (cartItem.quantity * cartItem.price)
        },0)
    )

    const cart = state.cart.sort((a,b)=>{
        const ItemA =Number(a.title.slice(-4))
        const ItemB =Number(b.title.slice(-4))
        return ItemA -ItemB
    })
    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type useCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: useCartContextType = {
    dispatch:()=>{},
        REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
        totalItems:0,
        totalPrice:'',
        cart:[],  

}
export const CartContext = createContext<useCartContextType>(initCartContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const CartProvider = ({children}:ChildrenType):ReactElement =>{
    return(
        <CartContext.Provider value = {useCartContext(initCartContextState)}>
        {children}
        </CartContext.Provider>
    )
}
export default CartContext