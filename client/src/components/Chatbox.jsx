import { useRef } from "react";
import { useEffect } from "react";
import useStore from "../store/useStore";
import ChatMessage from "./ChatMessage";
import { useLocation } from "wouter";
import JoinChannelModal from "./JoinChannelModal";
import AddToChannelModal from "./AddToChannelModal";
import { leaveChannel } from "../utils/api";

const EVENTS = {
  NEW_MESSAGE: "new-message-event",
  JOIN_ROOM: "join-room-event",
};

export default function Chatbox({ ch }) {
  const socket = useStore((state) => state.socket);
  const user = useStore((state) => state.user);
  const { messages } = useStore((state) => ({ messages: state.messages }));
  const initMessages = useStore((state) => state.initMessages);
  const addMessage = useStore((state) => state.addMessage);
  const removeTab = useStore((state) => state.removeTab);
  const switchTab = useStore((state) => state.switchTab);
  const getUser = useStore((state) => state.getUser);
  const [, setLocation] = useLocation();
  const newMessageRef = useRef();
  const messagesEl = useRef();
  useEffect(() => {
    // TODO: show form to join the room or redirect if no room or if private

    const isAllowed = user?.rooms_joined?.find((r) => r?.name === ch);
    if (!isAllowed) {
      setLocation("/app/dashboard");
    }
  }, [ch]);
  useEffect(() => {
    if (socket) {
      initMessages(ch);
      socket.emit(EVENTS.JOIN_ROOM, ch);
      socket.on(EVENTS.NEW_MESSAGE, (message) => {
        addMessage(message, message.room, true);
      });
    }
  }, [ch]);

  useEffect(() => {
    const newMessageHandler = (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight });
    };
    if (messagesEl) {
      messagesEl.current.addEventListener("DOMNodeInserted", newMessageHandler);
    }
    return () => {
      if (messagesEl.current) {
        messagesEl.current.removeEventListener(
          "DOMNodeInserted",
          newMessageHandler
        );
      }
    };
  }, []);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessageRef.current.value) return;
    socket.emit(EVENTS.NEW_MESSAGE, {
      roomName: ch,
      messageBody: newMessageRef.current.value,
    });
    addMessage(newMessageRef.current.value, ch);
    newMessageRef.current.value = "";
  };

  const leaveChannelHandler = async (e) => {
    try {
      await leaveChannel(ch);
      switchTab("dashboard");
      setLocation("/app/dashboard");
      removeTab(ch);
      await getUser();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="h-14 w-full">
        <ul className="flex h-full items-center justify-end">
          <li className="">
            <label
              htmlFor={`${ch}-adduser-modal`}
              className="modal-button btn-primary btn-sm btn mx-2"
            >
              Add to channel
            </label>
            <AddToChannelModal channel={ch} />
          </li>
          <li>
            <button
              className="btn-accent btn-sm btn mx-2"
              onClick={leaveChannelHandler}
            >
              leave channel
            </button>
          </li>
        </ul>
      </div>
      <div className="h-full overflow-y-scroll" ref={messagesEl}>
        {messages?.[ch] &&
          messages?.[ch].map((msg, idx) => <ChatMessage msg={msg} key={idx} />)}
      </div>
      <form onSubmit={sendMessageHandler}>
        <div className="form-control ">
          <div className="input-group px-2">
            <input
              type="text"
              placeholder={`Message #${ch}`}
              className="input-bordered input w-full "
              ref={newMessageRef}
            />
            <button className="btn-md btn">Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
