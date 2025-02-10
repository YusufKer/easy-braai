import { Routes, Route } from 'react-router'
import Nav from "./components/Nav.tsx"
import Home from "./routes/Home.tsx"
import Cart from "./routes/Cart.tsx"
import BuildYourPlate from "./routes/BuildYourPlate.tsx"
import CartProvider from "./context/cartContext.tsx"

export default function App(){
  return (
    <CartProvider>
      <Nav/>
      <div className="bg-blue-400 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/build-your-plate" element={<BuildYourPlate/>} />
          <Route path="/cart" element={<Cart/>} />
      </Routes>
      </div>
    </CartProvider>
  )
}
