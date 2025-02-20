import { Routes, Route } from "react-router";
import Nav from "./components/Nav.tsx";
import Home from "./routes/Home.tsx";
import Cart from "./routes/Cart.tsx";
import Signup from "./routes/Signup.tsx";
import Login from "./routes/Login.tsx";
import BuildYourPlate from "./routes/BuildYourPlate.tsx";
import CartProvider from "./context/cartStore.tsx";
import Footer from "./components/Footer.tsx";
import MeatProvider from "./context/meatStore.tsx";
import AuthProvider from "./context/authStore.tsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-[#f29a00]">
          <Nav />
          <div className="container mx-auto p-4 bg-[#FFCF50]">
            <MeatProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/build-your-plate" element={<BuildYourPlate />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </MeatProvider>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
