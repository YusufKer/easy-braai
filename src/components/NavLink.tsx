import { NavLink } from "react-router";

type NavItemProps = {
  children: React.ReactNode;
  to: string;
  flexOne?: boolean;
};

export default function NavItem({
  children,
  to,
  flexOne = false,
}: NavItemProps) {
  return (
    <li
      className={
        flexOne ? "flex-1 text-white font-bold" : "text-white font-bold"
      }
    >
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        {children}
      </NavLink>
    </li>
  );
}

const activeClass = "decoration-[#b01218] underline";
const inactiveClass = "";
