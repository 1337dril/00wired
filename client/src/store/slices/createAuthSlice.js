import { fetchUserData, loginUser, registerUser } from "../../utils/api";

const createAuthSlice = (set, get) => ({
  user: null,
  status: "idle",
  error: null,

  getUser: async () => {
    if (get().status !== "fetching") {
      try {
        set({ status: "fetching" });
        const user = await fetchUserData();
        set({ user });
        set({ error: null });
      } catch (e) {
        set({ user: null });
        set({ error: e });
      } finally {
        set({ status: "done" });
      }
    }
  },
});

export default createAuthSlice;
