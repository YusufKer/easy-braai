import { createContext, useState, useContext } from 'react'

const CartContext =  createContext();

export default function CartProvider({ children }){
  const [count, setCount] = useState(0)
  
  function increment(){
    setCount(prevCount => prevCount + 1)
  } 

  return (
    <CartContext.Provider value={{count, increment}}>
      { children }
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
