import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Operator/Dashboard"
import Inventory from "./components/Operator/Inventory"
import Report from "./components/Operator/Report"
import Admin from "./components/Admin/Admin"
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/operator-dashboard" Component={Dashboard} />
        <Route path="/operator-inventory" Component={Inventory} />
        <Route path="/operator-reports" Component={Report} />
        <Route path="/Admin" Component={Admin} />
      </Routes>
    </Router>
    </>
  )
}

export default App
