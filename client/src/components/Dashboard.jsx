import { useState } from "react";
import DashboardCreateChannel from "./DashboardCreateChannel";
import DashboardJoinChannels from "./DashboardJoinChannels";
import DashboardYourChannels from "./DashboardYourChannels";

const TABS = ["your-channels", "join-channels", "create-channel"];

export default function Dashboard() {
  const [dashboardActiveTab, setDashboardActiveTab] = useState(TABS[0]);
  return (
    <div className="h-screen lg:flex lg:flex-row-reverse">
      <div className="lg:w-1/5 lg:my-24 lg:px-0 px-5 py-3 lg:border-neutral  lg:gap-4 text-base-content flex flex-col lg:border-l">
        <h2 className="lg:font-bold text-xl px-5 lg:block">Your dashboard</h2>
        <div className="divider my-0"></div>
        <a
          className={`text-primary cursor-pointer pb-1 px-5 hover:underline ${
            dashboardActiveTab === TABS[0] && "text-primary-focus underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[0])}
        >
          - Your Channels
        </a>
        <a
          className={`text-primary cursor-pointer pb-1 px-5 hover:underline ${
            dashboardActiveTab === TABS[1] && "text-primary-focus underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[1])}
        >
          - Join Channels
        </a>
        <a
          className={`text-primary cursor-pointer pb-1 px-5 hover:underline ${
            dashboardActiveTab === TABS[2] && "text-primary-focus underline"
          }`}
          onClick={() => setDashboardActiveTab(TABS[2])}
        >
          - Create New Channel
        </a>
      </div>

      {dashboardActiveTab === TABS[0] && <DashboardYourChannels />}
      {dashboardActiveTab === TABS[1] && <DashboardJoinChannels />}
      {dashboardActiveTab === TABS[2] && <DashboardCreateChannel />}
    </div>
  );
}
