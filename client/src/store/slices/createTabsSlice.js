const createTabsSlice = (set, get) => ({
  tabs: [],
  activeTab: "dashboard",
  addTab: (tab) => {
    let isOpen = get().tabs.some((t) => t === tab);
    if (isOpen) {
      get().switchTab(tab);
      return;
    }
    set({
      tabs: [...get().tabs, tab],
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
      tabs: get().tabs.filter((t) => t !== tab),
    });
  },
});

export default createTabsSlice;
