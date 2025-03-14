import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Operator/Dashboard"
import Inventory from "./components/Operator/Inventory"
import Report from "./components/Operator/Report"
import Admin from "./components/Admin/Admin"
import LandingPage from "./components/Landing";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/operator/" Component={Dashboard} />
        <Route path="/operator/inventory" Component={Inventory} />
        <Route path="/operator/reports" Component={Report} />
        <Route path="/Admin" Component={Admin} />
      </Routes>
    </Router>
    </>
  )
}

export default App
