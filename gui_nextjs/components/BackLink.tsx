import Link from "next/link";

// Jednoduchá komponenta, která sjednocuje vzhled odkazu "Zpět" napříč aplikací
export default function BackLink({ href = "/", children = "← Zpět" }) {
  return (
    <Link href={href} className="text-blue-600 font-bold hover:underline mb-8 inline-block">
      {children}
    </Link>
  );
}