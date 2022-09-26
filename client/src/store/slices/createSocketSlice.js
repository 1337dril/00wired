import { io } from "socket.io-client";
import { getToken } from "../../utils/api";
const createSocketSlice = (set, get) => ({
  socket: null,
  initSocket: () => {
    const token = getToken();
    if (!get().socket && token) {
      set({
        socket: io(import.meta.env.VITE_BACKEND_URL, { auth: { token } }),
      });
    }
  },
});

export default createSocketSlice;
