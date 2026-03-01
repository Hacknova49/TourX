import { useState } from "react";

import GlobalStyles from "../components/GlobalStyles";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import LiveMap from "../components/LiveMap";
import IncidentDetail from "../components/IncidentDetail";
import CaseTable from "../components/CaseTable";
import StatusBar from "../components/StatusBar";

export default function PoliceDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <GlobalStyles />

      <div className="h-screen flex flex-col bg-[#0b1220] text-white">

        {/* Top Navigation */}
        <TopNav />

        {/* Main Section */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar */}
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          {/* Content Area */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">

            {/* Summary Cards */}
            <SummaryCards />

            {/* Map Section */}
            <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden">
              <LiveMap />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-4 h-[260px]">
              <IncidentDetail />
              <CaseTable />
            </div>

          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />

      </div>
    </>
  );
}