import { Link } from "wouter";
import useStore from "../store/useStore";

export default function DashboardYourChannels() {
  const user = useStore((state) => state.user);
  const addTab = useStore((state) => state.addTab);
  // const channels = user?.rooms_owned
  //   ? user.rooms_owned.concat(user.rooms_joined)
  //   : user?.rooms_joined;
  const channels = user?.rooms_joined || [];
  return (
    <div className="w-full bg-base-300 rounded-lg lg:bg-base-100">
      <div className="p-5 w-full">
        <h1 className="text-2xl  px-5">Your Channels</h1>
        <div className="divider my-2" />
        {channels.map((channel) => (
          <div key={channel.name} className="bg-base-200 my-2 shadow-xl">
            <div className="flex lg:flex-row w-full p-5">
              <div className="w-4/5">
                <h2 className="text-primary text-2xl font-bold">
                  {channel.name}
                </h2>
                <h3 className="text-xs leading-tight tracking-tighter text-base-content">
                  Online:{" "}
                  <span className="">{channel.active_users_length || 0}</span> -
                  Total users:{" "}
                  <span className="">{channel.allowed_access_length || 0}</span>
                </h3>
              </div>
              <div className="lg:w-1/5 py-2 flex items-end justify-center">
                <Link
                  href={`/app/${channel.name}`}
                  onClick={() => addTab(channel.name)}
                  className="btn modal-button btn-primary btn-sm"
                >
                  Open
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
