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
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
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
