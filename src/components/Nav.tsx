import { NavLink, Link } from "react-router"

export default function Nav(){
  return (
    <div className="bg-red-400">
      <ul className="flex gap-4 container mx-auto p-4 bg-red-300">
        <li className="flex-1"><NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>Home</NavLink></li>
        <li><NavLink to="/build-your-plate" className={({isActive}) => isActive ? activeClass : inactiveClass}>Build your plate</NavLink></li>
        <li><NavLink to="/cart" className={({isActive}) => isActive ? activeClass : inactiveClass}>Cart</NavLink></li>   
    </ul>
    </div>
  )
}

const activeClass = 'bg-red-600'
const inactiveClass = 'bg-red-400'
