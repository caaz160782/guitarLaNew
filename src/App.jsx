import { useState,useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { guitardb } from "./bd/gutarrasBd"


Header
function App(){

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

  

  
  
    return (<>
    <Header 
      cart={cart}
      removeItem={removeItem}
      increaseQuantity={increaseQuantity}
      reduceQuantity={reduceQuantity}
      delCart={delCart}

      />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">       
       
          {data.length > 0 ?
          
            data.map((guitar)=>{
             return(<Guitar 
                     key={guitar.id}
                     guitar={guitar}
                     addCart={addCart}
                     />)
            })         
            :<div>No exiten guitarras </div>
            }
        </div>
    </main>
    <Footer/>
    </>)
}

export default App