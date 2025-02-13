import { useCart } from "../context/cartContext.tsx";

export default function Home() {
  const cartStore = useCart();

  function handleClick() {
    console.log(cartStore?.cart);
  }
  return (
    <>
      <h1>Welcome to Easy Braai</h1>
      <p>Where we take the work and leave you with the fun.</p>
      <button onClick={handleClick}>click</button>
    </>
  );
}
