 
 
 import { useState,useEffect,useMemo } from "react"
 import { guitardb } from "../bd/gutarrasBd"

 const useCart = () => {
    const initialCart=()=>{
        const localStorageCart= localStorage.getItem('cart')
        return localStorageCart? JSON.parse(localStorageCart) :[]
      }
    
       const [data,setData] =useState([])
       const [cart,setCart] =useState(initialCart)
       const MIN_ITEMS=1
       
       useEffect(() => {
         if(guitardb.length >0){
            setData(guitardb)
         }     
       }, [data])
    
       useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
       },[cart])
    
      
       const addCart=(item)=>{
        const itemExist=cart.findIndex(guitar => guitar.id === item.id)
        if(itemExist >=0 ){
          const updateCart=[...cart];
          updateCart[itemExist].quantity++
          setCart(updateCart)
        }else{
          item.quantity=1
          setCart([...cart,item])
        }
       
       }
    
      const removeItem=(id)=>{
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
       }
    
      const increaseQuantity=(id)=>{
        const updateCart= cart.map(item =>{
          if(item.id ===id){
            return{
              ...item,
              quantity: item.quantity +1
            }
          }
          return item
        })
        setCart(updateCart)
       }
    
       const reduceQuantity=(id)=>{
        const updateCart= cart.map(item =>{
          if(item.id ===id && item.quantity >MIN_ITEMS ){
            return{
              ...item,
              quantity: item.quantity -1
            }
          }
          return item
        })
        setCart(updateCart)
       }
    
      const delCart=()=>{
        setCart([])
       }

    const isEmpty= useMemo( () => cart.length === 0, [cart] )
    const cartTotal= useMemo(()=> cart.reduce((total,item)=> total +(item.quantity * item.price),0), [cart])

     return{
        data,
        cart,
        setCart,
        addCart,
        removeItem,
        increaseQuantity,
        reduceQuantity,
        delCart,
        isEmpty,
        cartTotal
     }  
    
 }
 
 export default useCart