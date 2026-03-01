import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PoliceDashboard from "./pages/PoliceDashboard";
import PoliceLogin from "./pages/PoliceLogin";
import PoliceVerification from "./pages/PoliceVerification";
function App() {
  const [count, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
    return (
      //<PoliceDashboard/>
      <PoliceLogin/>
      //<PoliceVerification/>

    )
}

export default App
