import { Link } from "wouter";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <div className="flex justify-center items-center ">
                <Link href="/app/dashboard" className="btn  btn-primary">
                  launch app
                </Link>
              </div>
            </li>
            {/* <li tabIndex={0}>
              <a className="justify-between">
                Theme
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li className="">
                  <button className="w-24 bg-base-200" data-set-theme="garden">
                    Light
                  </button>
                </li>
                <li className="">
                  <button className="w-24 bg-base-200" data-set-theme="dracula">
                    Dark
                  </button>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        {/* <div className="flex-1 mx-2"> */}
        {/* logo */}
        <Link href="/">
          <Logo className="max-h-24 max-w-fit cursor-pointer" />
        </Link>
        {/* </div> */}
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        <Link href="/app/dashboard">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div> */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
          {/* <ThemeSwither /> */}
          <div className="flex justify-center items-center">
            <Link href="/app/dashboard" className="btn mx-4 btn-primary">
              launch app
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
