export default function ChatMessage({ msg }) {
  return (
    <div className="overflow-hidden text-ellipsis py-1 pl-12 pr-4 hover:bg-dark-gray-300">
      <h4 className="block">
        <span className="text-primary ">{msg.sender}</span>
        <div className="divider divider-horizontal  inline text-xs">~</div>
        <span className="text-xs">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </span>
      </h4>
      <p className="">{msg.content}</p>
    </div>
  );
}
