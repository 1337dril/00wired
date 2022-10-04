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
    <div className="overflow-hidden relative w-80 bg-base-300">
      <div className="flex justify-between items-center h-20 p-2">
        <Link href="/">
          <button className="btn bg-base-300 border-none h-full">
            <Logo className="h-full" />
          </button>
        </Link>
        <Link href="/app/dashboard" onClick={() => switchTab("dashboard")}>
          <button className="btn bg-base-300 ">Dashboard</button>
        </Link>
      </div>
      <ul className="menu p-4 overflow-y-scroll h-[calc(100%-10rem)] w-full bg-base-300 text-base-content">
        {channels.map((channel, idx) => (
          <li key={idx}>
            <Link
              href={`/app/${channel.name}`}
              onClick={() => addTab(channel.name)}
            >
              {channel.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 h-20 bg-base-200 flex p-5 items-center justify-between w-full">
        <div>
          <span className="text-lg font-bold">{user?.username}</span>
        </div>
        <div>
          <Link
            href="/"
            className="btn btn-outline btn-error btn-sm"
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
