type HeadingProps = {
  headingType?: "main" | "default";
  children: React.ReactNode;
};

export default function Heading({
  children,
  headingType = "default",
}: HeadingProps) {
  return headingType === "main" ? (
    <h1 className="text-3xl">{children}</h1>
  ) : (
    <h2 className="text-2xl">{children}</h2>
  );
}
