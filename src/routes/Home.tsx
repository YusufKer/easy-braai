import { useCart } from "../context/cartContext.tsx"

export default function Home(){

  const cart = useCart()

  function handleClick(){
    cart.increment()
  }
  return (
    <>
      <h1>Working...</h1>
      <p>Count: {cart.count}</p>
      <button onClick={handleClick}>Increment</button>
    </>
  )
}
