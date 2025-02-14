import NavItem from "./NavLink.tsx";
import { useCart } from "../context/cartContext.tsx";

export default function Nav() {
  const cartStore = useCart();
  return (
    <div className="bg-[#A4B465]">
      <ul className="flex gap-4 container mx-auto p-4 w-full">
        <NavItem flexOne to="/">
          Home
        </NavItem>
        <NavItem to="/build-your-plate">Build A Plate</NavItem>
        <NavItem to="/cart">
          <span className="flex">
            Cart{" "}
            <span>
              <span className="w-4 aspect-square bg-[#626F47] text-xs rounded-full flex items-center justify-center">
                {cartStore?.cart.length}
              </span>
            </span>
          </span>
        </NavItem>
      </ul>
    </div>
  );
}
