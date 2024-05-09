
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import Footer from "./components/Footer"
import useCart from "./hooks/useCart"

function App(){

  const{
    data,
    cart,    
    addCart,
    removeItem,
    increaseQuantity,
    reduceQuantity,
    delCart,
    isEmpty,
    cartTotal
  }=useCart()
 
  

  
  
    return (<>
    <Header 
      cart={cart}
      removeItem={removeItem}
      increaseQuantity={increaseQuantity}
      reduceQuantity={reduceQuantity}
      delCart={delCart}
      isEmpty={isEmpty}
      cartTotal={cartTotal}
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