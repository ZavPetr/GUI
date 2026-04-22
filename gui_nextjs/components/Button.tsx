interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "red";
}

export default function Button({ children, variant = "white", className = "", ...props }: ButtonProps) {
  const variants = {
    white: "bg-white text-black",
    black: "bg-black text-white",
    red: "text-red-500 border-red-400 hover:bg-red-50"
  };

  return (
    <button
      {...props}
      className={`border-4 border-black py-2 px-6 rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}