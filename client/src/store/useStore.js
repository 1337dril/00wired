import create from "zustand";
import createAuthSlice from "./slices/createAuthSlice";
import createMessagesSlice from "./slices/createMessagesSlice";
import createSocketSlice from "./slices/createSocketSlice";
import createTabsSlice from "./slices/createTabsSlice";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    ...createSocketSlice(set, get),
    ...createMessagesSlice(set, get),
    ...createAuthSlice(set, get),
    ...createTabsSlice(set, get),
  }))
);

export default useStore;
