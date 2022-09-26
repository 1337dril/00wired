import { Link } from "wouter";
import useStore from "../store/useStore";
import Logo from "./Logo";
export default function ApplicationSidebar() {
  const user = useStore((state) => state.user);
  const channels = user.rooms_joined;
  const addTab = useStore((state) => state.addTab);
  const switchTab = useStore((state) => state.switchTab);

  return (
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content relative">
      <Link href="/">
        <li className="w-full">
          <Logo className="w-full" />
        </li>
      </Link>
      <li className="bg-base-200 font-bold rounded-lg text-primary">
        <Link href={`/app/dashboard`} onClick={() => switchTab("dashboard")}>
          Dashboard
        </Link>
      </li>
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
  );
}
