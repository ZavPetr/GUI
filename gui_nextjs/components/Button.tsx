interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "red";
}

export default function Button({ children, variant = "white", className = "", ...props }: ButtonProps) {
  const variants = {
    white: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white",

    black: "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black",

    red: "bg-red-500 text-white shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] hover:bg-red-200 hover:text-black border-red-500"
  };

  return (
    <button
      {...props}
      className={`border-4 border-black py-2 px-6 rounded-2xl font-black uppercase active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}