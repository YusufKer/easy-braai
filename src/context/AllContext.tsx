import AuthProvider from "./authStore";
import CartProvider from "./cartStore";
import MeatProvider from "./meatStore";
import ModalProvider from "./modalStore";

type MainContextProps = {
  children: React.ReactNode;
};

export default function AllContext({ children }: MainContextProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider>
          <MeatProvider>{children}</MeatProvider>
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}
