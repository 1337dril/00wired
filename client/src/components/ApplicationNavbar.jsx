import { useEffect } from "react";
import { Link, useLocation, useRoute } from "wouter";
import useStore from "../store/useStore";

export default function ApplicationNavbar({}) {
  const tabs = useStore((state) => state.tabs);
  const activeTab = useStore((state) => state.activeTab);
  const switchTab = useStore((state) => state.switchTab);
  const removeTab = useStore((state) => state.removeTab);
  const addTab = useStore((state) => state.addTab);
  const [, setLocation] = useLocation();
  const [match, { ch }] = useRoute("/app/:ch");
  const decodedCh = decodeURI(ch);

  useEffect(() => {
    if (tabs.length === 0 && match && decodedCh !== "dashboard") {
      addTab(decodedCh);
    }
  }, []);
  return (
    <div className="carousel h-12 overflow-x-scroll border-b bg-dark-gray-700 ">
      <label
        htmlFor="my-drawer-2"
        className="tab tab-lifted tab-lg border-none lg:hidden"
      >
        {"<<"}
      </label>
      <Link
        href="/app/dashboard"
        className={`tab tab-lifted  tab-lg hidden lg:flex ${
          activeTab === "dashboard" && "tab-active"
        }`}
        onClick={() => switchTab("dashboard")}
      >
        Dashboard
      </Link>
      <div className="divider divider-vertical "></div>

      <div className="carousel-center carousel overflow-y-hidden ">
        {tabs &&
          [...tabs].map((tab) => (
            <Link
              key={tab}
              href={`/app/${tab}`}
              className={`carousel-item tab tab-lifted tab-lg relative pr-5 ${
                activeTab === tab && "tab-active bg-red-500"
              }`}
              onClick={() => {
                if (activeTab === tab) {
                  switchTab("dashboard");
                  setLocation("/app/dashboard");
                  removeTab(tab);
                } else {
                  switchTab(tab);
                }
              }}
            >
              {tab}
              <div
                className={`absolute right-1  top-3 z-20 h-3 w-3 items-center justify-center rounded-full bg-red-400 text-xs hover:bg-red-500 ${
                  activeTab === tab ? "flex" : "hidden"
                }`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
