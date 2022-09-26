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
    <div className="carousel bg-base-300 overflow-x-scroll  h-12 ">
      <label
        htmlFor="my-drawer-2"
        className="tab tab-lg tab-lifted border-none lg:hidden"
      >
        {"<<"}
      </label>
      <Link
        href="/app/dashboard"
        className={`tab tab-lg  tab-lifted hidden lg:flex ${
          activeTab === "dashboard" && "tab-active"
        }`}
        onClick={() => switchTab("dashboard")}
      >
        Dashboard
      </Link>
      <div className="divider divider-vertical "></div>

      <div className="carousel carousel-center overflow-y-hidden">
        {tabs &&
          [...tabs].map((tab) => (
            <Link
              key={tab}
              href={`/app/${tab}`}
              className={`tab tab-lg carousel-item relative pr-5 tab-lifted ${
                activeTab === tab && "tab-active"
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
                className={`absolute right-1  top-3 z-20 justify-center items-center hover:bg-red-500 bg-red-400 w-3 h-3 text-xs rounded-full ${
                  activeTab === tab ? "flex" : "hidden"
                }`}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}
