import { useCart } from "../context/cartContext.tsx";

export default function Home() {
  const cartStore = useCart();

  function handleClick() {
    console.log(cartStore?.cart);
  }
  return (
    <div className="space-y-4">
      <h1>Effortless Braais, Unforgettable Flavor</h1>

      <p>
        Hosting a braai should be about good food and great company—not the
        hassle of marinating meat or washing endless dishes. That’s where we
        come in.
      </p>

      <p>
        With our <strong>pre-marinated, ready-to-braai meats</strong>, you get{" "}
        <strong>premium cuts</strong> infused with bold flavors, delivered
        straight to your door.
      </p>

      <h2>How It Works</h2>
      <ol>
        <li>
          <strong>Choose Your Cuts</strong> – Select from a variety of premium
          meats.
        </li>
        <li>
          <strong>Pick Your Flavors</strong> – From classic BBQ to bold
          peri-peri, we’ve got something for every taste.
        </li>
        <li>
          <strong>Set Your Portions</strong> – Tell us how many guests you're
          serving (1 plate per person).
        </li>
        <li>
          <strong>Pick Your Delivery Date</strong> – We’ll make sure your order
          arrives fresh and ready to braai.
        </li>
      </ol>

      <p>
        🔥 <strong>Let’s Build Your Plate!</strong> 🔥
      </p>

      <p>
        We'll handle the prep, so all you need to do is{" "}
        <strong>fire up the grill and enjoy</strong>.
      </p>

      <p>
        <strong>
          Less mess, no stress—just delicious, hassle-free braais.
        </strong>
      </p>

      <p>
        <a href="#">Order now</a> and make your next braai effortless!
      </p>
    </div>
  );
}
