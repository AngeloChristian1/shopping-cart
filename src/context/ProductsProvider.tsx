import React, { ReactElement, createContext } from "react";
import {useState, useEffect} from 'react'
import '../App.css'
export type ProductType = {
    id: number,
    category: string,
    image: string,
    price: number,
    title: string,
    description: string,
}
// 
// const [data, setData] = useState([]);

// useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((err) => console.log(err));
//   }, []);
//   console.log(data);



const initState: ProductType[] = []
// console.log(initState);

export type UseProductsContextType = {products:ProductType[]}

const initContextState: UseProductsContextType = {products:[]}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductProvider = ({ children }: ChildrenType): ReactElement =>{ 
    const [products, setProducts] = useState<ProductType[]>(initState)
    
    useEffect(() =>{
        const fetchProducts = async(): Promise<ProductType[]> =>{
            const data = await fetch("https://fakestoreapi.com/products").then(res=>{
                return res.json()
            }).catch(error =>{
                if (error instanceof Error) console.log(error.message) 
            })
            return data
        }
        fetchProducts().then(products => setProducts(products))
    },[])
    return(
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext