import { useCart } from "../context/cartContext.tsx"

export default function Home(){

  const cart = useCart()

  function handleClick(){
    cart.increment()
  }
  return (
    <>
      <h1>Welcome to Easy Braai</h1>
      <p>Where we take the work and leave you with the fun.</p>
    </>
  )
}
