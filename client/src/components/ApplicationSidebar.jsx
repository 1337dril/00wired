import { Link } from "wouter";
import useStore from "../store/useStore";
import { logoutUser } from "../utils/api";
import Logo from "./Logo";

export default function ApplicationSidebar() {
  const user = useStore((state) => state.user);
  const channels = user.rooms_joined;
  const addTab = useStore((state) => state.addTab);
  const switchTab = useStore((state) => state.switchTab);
  console.log(user);
  return (
    <div className="relative w-80 overflow-hidden bg-dark-gray-900">
      <div className="flex h-20 items-center justify-between bg-dark-gray-700 p-2">
        <Link href="/">
          <button className="btn h-full border-none bg-dark-gray-700">
            <Logo className="h-full" />
          </button>
        </Link>
        <Link href="/app/dashboard" onClick={() => switchTab("dashboard")}>
          <button className="btn bg-dark-gray-700 ">Dashboard</button>
        </Link>
      </div>
      <ul className="menu h-[calc(100%-10rem)] w-full overflow-y-scroll bg-dark-gray-700 p-4 text-base-content">
        {channels.map((channel, idx) => (
          <li key={idx} className="rounded bg-dark-gray-500">
            <Link
              href={`/app/${channel.name}`}
              onClick={() => addTab(channel.name)}
            >
              {channel.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 flex h-20 w-full items-center justify-between bg-dark-gray-900 p-5">
        <div>
          <span className="text-lg font-bold">{user?.username}</span>
        </div>
        <div>
          <Link
            href="/"
            className="btn-outline btn-error btn-sm btn"
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
