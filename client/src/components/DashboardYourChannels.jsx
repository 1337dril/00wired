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
    <div className="w-full border-l bg-dark-gray-500">
      <div className="w-full p-5">
        <h1 className="px-5  text-2xl">Your Channels</h1>
        <div className="divider my-2" />
        {channels.map((channel) => (
          <div key={channel.name} className="my-2 bg-dark-gray-300 shadow-xl">
            <div className="flex w-full p-5 lg:flex-row">
              <div className="w-4/5">
                <h2 className="text-2xl font-bold text-white">
                  {channel.name}
                </h2>
                <h3 className="text-xs leading-tight tracking-tighter text-dark-gray-100">
                  Online:{" "}
                  <span className="">{channel.active_users_length || 0}</span> -
                  Total users:{" "}
                  <span className="">{channel.allowed_access_length || 0}</span>
                </h3>
              </div>
              <div className="flex items-end justify-center py-1 lg:w-1/5">
                <Link
                  href={`/app/${channel.name}`}
                  onClick={() => addTab(channel.name)}
                  className="modal-button btn-outline btn-md btn"
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
