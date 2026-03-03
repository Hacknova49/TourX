import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./tourist/pages/Landing";
import touristHome from "./tourist/pages/touristHome";
import PoliceDashboard from "./pages/PoliceDashboard";
import PoliceLogin from "./pages/PoliceLogin";
function App() {
  const [count, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
    return (
      <PoliceDashboard/>
      //

    )
}

export default App
