import NavItem from "./NavLink.tsx";
import { useCartStore } from "../context/cartStore.tsx";

export default function Nav() {
  const cartStore = useCartStore();
  return (
    <div className="bg-black">
      <ul className="flex gap-4 container mx-auto p-4 w-full">
        <NavItem flexOne to="/">
          Home
        </NavItem>
        <NavItem to="/build-your-plate">Build A Plate</NavItem>
        <NavItem to="/cart">
          <span className="flex">
            Cart{" "}
            {cartStore?.cart?.length && cartStore?.cart?.length > 0 ? (
              <span>
                <span className="w-4 aspect-square bg-[#f29a00] text-xs rounded-full flex items-center justify-center">
                  {cartStore?.cart.length}
                </span>
              </span>
            ) : null}
          </span>
        </NavItem>
      </ul>
    </div>
  );
}
