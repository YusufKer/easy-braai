type ButtonProps = {
  classList?: string;
  disabled?: boolean;
  type: "info" | "danger" | "success" | "warning";
  children: React.ReactNode;
  handleClick: () => void;
};

export default function Button({
  type,
  children,
  handleClick,
  disabled,
  classList = "",
}: ButtonProps) {
  const staticClasses = "rounded px-4 py-2 disabled:bg-gray-300 cursor-pointer";
  const dynamicClasses: Record<ButtonProps["type"], string> = {
    info: "bg-blue-400",
    danger: "bg-red-400",
    success: "bg-green-400",
    warning: "bg-yellow-400",
  };

  return (
    <button
      onClick={handleClick}
      className={staticClasses + " " + dynamicClasses[type] + " " + classList}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
