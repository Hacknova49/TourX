export default function PoliceDashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#0b1220] text-white">

      {/* Top Navigation */}
      <TopNav />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">

          {/* Summary Cards */}
          <SummaryCards />

          {/* Map Section */}
          <div className="flex-1 rounded-xl overflow-hidden">
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
  );
}