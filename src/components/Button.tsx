type ButtonProps = {
  round?: boolean;
  classList?: string;
  disabled?: boolean;
  type: "info" | "danger" | "success" | "warning";
  children: React.ReactNode;
  buttonType?: "button" | "submit" | "reset";
  handleClick?: () => void;
};

export default function Button({
  round,
  type,
  children,
  handleClick = () => {},
  disabled,
  classList = "",
  buttonType = "button",
}: ButtonProps) {
  const staticClasses = "disabled:bg-gray-300 cursor-pointer font-bold";
  const borderRadiusClass = round
    ? "rounded-full aspect-square w-8 leading-0"
    : "px-4 py-2 rounded";
  const dynamicClasses: Record<ButtonProps["type"], string> = {
    info: "bg-[#f29a00]",
    danger: "bg-[#b01218] text-white",
    success: "bg-green-400",
    warning: "bg-yellow-400",
  };

  return (
    <button
      onClick={handleClick}
      className={
        staticClasses +
        " " +
        dynamicClasses[type] +
        " " +
        classList +
        " " +
        borderRadiusClass
      }
      disabled={disabled}
      type={buttonType}
    >
      {children}
    </button>
  );
}
