import { NavLink, Link } from "react-router"

export default function NavItem({children, to, flexOne = false}){
  return (
    <li className={flexOne ? "flex-1" : ""}>
      <NavLink to={to} className={({isActive}) => isActive ? activeClass : inactiveClass}>{children}</NavLink>
    </li>
  )
}

const activeClass = 'bg-red-600 px-4 py-2'
const inactiveClass = 'bg-red-400 px-4 py-2'
