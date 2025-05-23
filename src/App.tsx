import { Routes, Route } from "react-router";
import { useModalStore } from "./context/modalStore.tsx";
import Nav from "./components/Nav.tsx";
import Home from "./routes/Home.tsx";
import Cart from "./routes/Cart.tsx";
import BuildYourPlate from "./routes/BuildYourPlate.tsx";
import Footer from "./components/Footer.tsx";
import Login from "./components/Login.tsx";
import Signup from "./routes/Signup.tsx";
import Profile from "./routes/Profile.tsx";
import Checkout from "./routes/Checkout.tsx";
import CheckoutPaymentFailed from "./routes/CheckoutPaymentFailed.tsx";
import CheckoutPaymentSuccess from "./routes/CheckoutPaymentSuccess.tsx";

export default function App() {
  const modalStore = useModalStore();
  return (
    <>
      <div className="bg-[#f29a00]">
        <Nav />
        <div className="container mx-auto p-4 bg-[#FFCF50]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build-your-plate" element={<BuildYourPlate />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/checkout/payment-failed"
              element={<CheckoutPaymentFailed />}
            />
            <Route
              path="/checkout/payment-success"
              element={<CheckoutPaymentSuccess />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
      {modalStore?.loginModalOpen && <Login />}
    </>
  );
}
