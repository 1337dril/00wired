import { fetchMessages } from "../../utils/api";

const createMessagesSlice = (set, get) => ({
  messages: {},
  lastMessageTS: 0,
  initMessages: async (roomName) => {
    const msgs = (await fetchMessages(roomName)).reverse() || [];
    set({ messages: { ...get().messages, [roomName]: msgs } });
  },
  addMessage: (messageBody, roomName, fromServer = false) => {
    const message = fromServer
      ? messageBody
      : {
          content: messageBody,
          sender: get().user.username,
          createdAt: new Date().toLocaleString(),
          room: roomName,
        };
    if (get().lastMessageTS === message.createdAt) {
      //hacky shit to prevent dupes
      return;
    }
    set({ lastMessageTS: message.createdAt });
    set((state) => ({
      ...state,
      messages: {
        ...get().messages,
        [roomName]: [...get().messages?.[roomName], message],
      },
    }));
  },
});
export default createMessagesSlice;
