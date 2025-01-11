import Link from "next/link";

export default function Footer() {
  return (
    <div className="py-4 bg-gradient-to-r from-green-100 to-teal-200 shadow-sm text-emerald-800">
      <div className="px-8 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 text-sm">
        <div className="flex items-center space-x-2">
          <Link href="https://github.com/sofvanh/autoblog">GitHub</Link>
        </div>
      </div>
    </div >
  );
}