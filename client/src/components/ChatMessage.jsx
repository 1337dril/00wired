export default function ChatMessage({ msg }) {
  return (
    <div className="py-2 pl-12 text-ellipsis overflow-hidden pr-4 hover:bg-base-200">
      <h4 className="block">
        <span className="text-primary ">{msg.sender}</span>
        <div className="divider text-xs  divider-horizontal inline">~</div>
        <span className="text-xs">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </span>
      </h4>
      <p className="">{msg.content}</p>
    </div>
  );
}
