export default function ThemeSwither() {
  return (
    <div className="dropdown dropdown-end">
      {/* <div className="flex justify-center items-center h-full"> */}
      <label tabIndex={0} className="btn btn-secondary mx-2">
        Theme
      </label>
      {/* </div> */}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="">
          <button className="w-full" data-set-theme="garden">
            Light
          </button>
        </li>
        <li className="">
          <button className="w-full" data-set-theme="dracula">
            Dark
          </button>
        </li>
      </ul>
    </div>
  );
}
