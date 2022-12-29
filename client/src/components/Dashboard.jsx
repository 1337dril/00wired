import { useEffect } from "react";
import { useState } from "react";
import useStore from "../store/useStore";
import DashboardCreateChannel from "./DashboardCreateChannel";
import DashboardJoinChannels from "./DashboardJoinChannels";
import DashboardYourChannels from "./DashboardYourChannels";

const TABS = ["your-channels", "join-channels", "create-channel"];

export default function Dashboard() {
  const [dashboardActiveTab, setDashboardActiveTab] = useState(TABS[0]);
  return (
    <div className="min-h-screen bg-dark-gray-700 lg:flex lg:flex-row-reverse">
      <div className="flex flex-col  px-5 py-3 text-base-content   lg:w-1/5 lg:gap-4 lg:border-l lg:border-neutral lg:px-0">
        <h2 className="px-5 text-xl lg:block lg:font-bold">Your dashboard</h2>
        <div className="divider my-0"></div>
        <a
          className={`cursor-pointer px-5 pb-1 text-white hover:underline ${
            dashboardActiveTab === TABS[0] && "text-dark-gray-100 underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[0])}
        >
          Your Channels
        </a>
        <a
          className={`cursor-pointer px-5 pb-1 text-white hover:underline ${
            dashboardActiveTab === TABS[1] && "text-dark-gray-100 underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[1])}
        >
          Join Channels
        </a>
        <a
          className={`cursor-pointer px-5 pb-1 text-white hover:underline ${
            dashboardActiveTab === TABS[2] && "text-dark-gray-100 underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[2])}
        >
          Create New Channel
        </a>
      </div>

      {dashboardActiveTab === TABS[0] && <DashboardYourChannels />}
      {dashboardActiveTab === TABS[1] && <DashboardJoinChannels />}
      {dashboardActiveTab === TABS[2] && <DashboardCreateChannel />}
    </div>
  );
}
