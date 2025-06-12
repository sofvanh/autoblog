import Link from "next/link";

export default function Footer() {
  return (
    <div className="px-8 py-8 bg-gradient-to-r from-green-100 to-teal-200 shadow-sm text-emerald-800 flex justify-center gap-8">
      <Link className="text-sm" href="https://github.com/sofvanh/autoblog">GitHub</Link>
      <Link className="text-sm" href="https://sofiavanhanen.com">Created by Sofia Vanhanen</Link>
    </div >
  );
}