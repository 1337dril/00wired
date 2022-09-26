const createTabsSlice = (set, get) => ({
  tabs: [],
  activeTab: "dashboard",
  addTab: (tab) => {
    set({
      tabs: new Set([...get().tabs, tab]),
      activeTab: tab,
    });
  },
  switchTab: (tab) => {
    set({
      activeTab: tab,
    });
  },
  removeTab: (tab) => {
    set({
      tabs: Array.from(get().tabs).filter((t) => t !== tab),
    });
  },
});

export default createTabsSlice;
