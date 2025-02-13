import NavItem from "./NavLink.tsx";
import { useCart } from "../context/cartContext.tsx";

export default function Nav() {
  const cartStore = useCart();
  return (
    <div className="bg-red-400">
      <ul className="flex gap-4 container mx-auto p-4 bg-red-300 w-full">
        <NavItem flexOne to="/">
          Home
        </NavItem>
        <NavItem to="/build-your-plate">Build Your Plate</NavItem>
        <NavItem to="/cart">
          Cart <span>{cartStore?.cart.length}</span>
        </NavItem>
      </ul>
    </div>
  );
}
