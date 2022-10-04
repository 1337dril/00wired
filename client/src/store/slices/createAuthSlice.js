import { fetchUserData } from "../../utils/api";

const createAuthSlice = (set, get) => ({
  user: null,
  isLoading: false,

  getUser: async () => {
    if (get().isLoading === false) {
      try {
        set({ isLoading: true });
        const user = await fetchUserData();
        set({ user });
      } catch (e) {
        set({ user: null });
        throw e;
      } finally {
        set({ isLoading: false });
      }
    }
  },
});

export default createAuthSlice;
