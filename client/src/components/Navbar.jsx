import { Link } from "wouter";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <div className="flex item-center w-full p-2 min-h-8">
      <div className="w-1/2">
        <Link id="logo" href="/">
          <Logo className="h-24 w-36 cursor-pointer" />
        </Link>
      </div>
      <div className="w-1/2 hidden md:flex">
        <ul className="flex justify-end gap-2 items-center text-lg w-full p-0">
          <li className="h-1/2 hover:bg-purple-900 flex items-center hover:text-white p-2 rounded-lg transition-color duration-300">
            <Link href="/login">Login</Link>
          </li>
          <li className="h-1/2 hover:bg-purple-900 flex items-center hover:text-white p-2 rounded-lg transition-color duration-300">
            <Link href="/signup">Signup</Link>
          </li>
          <div className="flex justify-center items-center">
            <Link
              href="/app/dashboard"
              className="btn mx-4 btn-outline hover:bg-purple-900 hover:text-white hover:border-purple-900"
            >
              launch app
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
