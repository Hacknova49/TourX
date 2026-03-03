import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./tourist/pages/Landing";
import touristHome from "./tourist/pages/touristHome";
import PoliceDashboard from "./pages/PoliceDashboard";
import PoliceLogin from "./pages/PoliceLogin";
function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/Login" element={<PoliceLogin/>}/>
      <Route path="/TouristHome" element={<touristHome/>}/>
      <Route path="/PoliceDashboard" element={<PoliceDashboard/>}/>
      </Routes>
      </BrowserRouter>
  );
}
export default App;