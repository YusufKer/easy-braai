import { NavLink } from "react-router";

type NavItemProps = {
  children: React.ReactNode;
  to?: string;
  flexOne?: boolean;
  type?: "link" | "button";
  handleClick?: () => void;
};

export default function NavItem({
  children,
  to,
  flexOne = false,
  type = "link",
  handleClick = () => null,
}: NavItemProps) {
  return (
    <li
      className={
        flexOne ? "flex-1 text-white font-bold" : "text-white font-bold"
      }
    >
      {type === "link" ? (
        <NavLink
          to={to || "/"}
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          {children}
        </NavLink>
      ) : (
        <button className={inactiveClass} onClick={handleClick}>
          {children}
        </button>
      )}
    </li>
  );
}

const activeClass = "decoration-[#b01218] underline";
const inactiveClass = "";
