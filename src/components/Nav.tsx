import NavItem from "./NavLink.tsx";
import { useCartStore } from "../context/cartStore.tsx";
import { useAuthStore } from "../context/authStore.tsx";
import { useModalStore } from "../context/modalStore.tsx";

export default function Nav() {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  function handleLogout() {
    authStore?.logout();
  }

  return (
    <div className="bg-black">
      <ul className="flex gap-4 container mx-auto p-4 w-full">
        <NavItem flexOne to="/">
          Home
        </NavItem>
        <NavItem to="/build-your-plate">Build A Plate</NavItem>
        {authStore?.user ? (
          <>
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
            <NavItem to="/profile">Profile</NavItem>
            <NavItem type="button" handleClick={handleLogout}>
              Logout
            </NavItem>
          </>
        ) : (
          <>
            <NavItem to="/signup">Signup</NavItem>
            <NavItem
              type="button"
              handleClick={() => modalStore?.openLoginModal()}
            >
              Login
            </NavItem>
          </>
        )}
      </ul>
    </div>
  );
}
