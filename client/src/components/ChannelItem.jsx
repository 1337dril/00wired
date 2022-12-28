import JoinRoomModal from "./JoinChannelModal";

export default function ChannelItem({ channel }) {
  return (
    <div className="my-2 bg-dark-gray-300 shadow-xl">
      <div className="flex w-full flex-col p-5 lg:flex-row">
        <div className="w-4/5">
          <h2 className="text-2xl font-bold text-primary">{channel.name}</h2>
          <h3 className="text-xs leading-tight tracking-tighter text-dark-gray-100">
            Online: <span>{channel.active_users_length || 0}</span> - Total
            users: <span>{channel.allowed_access_length}</span>
          </h3>
          <p className="py-2 text-dark-gray-100">{channel.description}</p>
        </div>
        <div className="flex items-end justify-center py-2 lg:w-1/5">
          <label
            htmlFor={`${channel.name}-modal`}
            className="modal-button btn-md btn"
          >
            Join Now
          </label>
          <JoinRoomModal channel={channel} />
        </div>
      </div>
    </div>
  );
}
