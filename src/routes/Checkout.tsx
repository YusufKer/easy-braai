import { useAuthStore } from "../context/authStore";
import CheckoutStepOne from "../components/Checkout/CheckoutStepOne";

export default function Checkout() {
  const auth = useAuthStore();

  if (!auth?.user) {
    return <p>This Page is only available to users who are logged in</p>;
  }

  console.log(auth?.userDetails);

  return (
    <div>
      <CheckoutStepOne address={auth?.userDetails?.address} />
    </div>
  );
}
