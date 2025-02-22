import { Routes, Route } from "react-router";
import Nav from "./components/Nav.tsx";
import Home from "./routes/Home.tsx";
import Cart from "./routes/Cart.tsx";
import Signup from "./routes/Signup.tsx";
import Login from "./routes/Login.tsx";
import BuildYourPlate from "./routes/BuildYourPlate.tsx";
import Footer from "./components/Footer.tsx";
import { useModalStore } from "./context/modalStore.tsx";

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
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {modalStore?.loginModalOpen && <Login />}
      {modalStore?.signupModalOpen && <Signup />}
    </>
  );
}
