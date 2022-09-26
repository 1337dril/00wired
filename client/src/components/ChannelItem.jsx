import JoinRoomModal from "./JoinChannelModal";

export default function ChannelItem({ channel }) {
  return (
    <div className="bg-base-200 my-2 shadow-xl">
      <div className="flex flex-col lg:flex-row w-full p-5">
        <div className="w-4/5">
          <h2 className="text-primary text-2xl font-bold">{channel.name}</h2>
          <h3 className="text-xs leading-tight tracking-tighter text-base-content">
            Online: <span>{channel.active_users_length || 0}</span> - Total
            users: <span>{channel.allowed_access_length}</span>
          </h3>
          <p className="py-2 text-base-content">{channel.description}</p>
        </div>
        <div className="lg:w-1/5 py-2 flex items-end justify-center">
          <label
            htmlFor={`${channel.name}-modal`}
            className="btn modal-button btn-primary btn-sm"
          >
            Join Now
          </label>
          <JoinRoomModal channel={channel} />
        </div>
      </div>
    </div>
  );
}
