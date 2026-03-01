import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PoliceDashboard from "./pages/PoliceDashboard";
import PoliceLogin from "./pages/PoliceLogin";
function App() {
  const [count, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
    return (
      <h1 style={{color:"white"}}>HELLO</h1>

    )
}

export default App
