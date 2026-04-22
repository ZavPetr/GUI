interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Card({ children, className = "", interactive = false }: CardProps) {
  const baseStyle = "border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white";
  const interactiveStyle = interactive
    ? "hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
    : "";

  return (
    <div className={`${baseStyle} ${interactiveStyle} ${className}`}>
      {children}
    </div>
  );
}