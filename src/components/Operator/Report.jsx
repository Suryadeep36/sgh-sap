import { useState } from "react";
import { Menu, Grid, Box, BarChart } from "lucide-react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Operator() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inventory, setInventory] = useState([
    { id: 1, name: "Monitors", quantity: 15, status: "Sufficient" },
    { id: 2, name: "Keyboards", quantity: 8, status: "Low Stock" },
    { id: 3, name: "Mice", quantity: 12, status: "Sufficient" },
    { id: 4, name: "Laptops", quantity: 5, status: "Low Stock" },
    { id: 5, name: "Ethernet Cables", quantity: 20, status: "Sufficient" },
    { id: 6, name: "Routers", quantity: 3, status: "Low Stock" },
    { id: 7, name: "External Hard Drives", quantity: 7, status: "Low Stock" },
    { id: 8, name: "RAM Modules (8GB)", quantity: 10, status: "Sufficient" },
    { id: 9, name: "Power Strips", quantity: 6, status: "Low Stock" },
    { id: 10, name: "Projectors", quantity: 2, status: "Low Stock" },
  ]);

  return (
    <div className="flex h-screen bg-gray-900 text-white w-full">
      {/* Sidebar */}
      <div className={`bg-gray-800 w-72 p-5 shadow-lg ${isSidebarOpen ? "block" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-300">Operator Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Grid size={20} /> <Link to="/operator-dashboard">Dashboard</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Box size={20} /> <Link to="/operator-inventory">Manage Inventory</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <BarChart size={20} /> <Link to="/operator-reports">Reports</Link>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        
        <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <button
            className="mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Operator Reports</h1>
        </header>

        {/* Inventory Overview */}
        <div className="mt-6 bg-gray-800 p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-300">Inventory Overview</h2>
          <table className="w-full border-collapse border border-gray-700 mt-2 text-white">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="border border-gray-600 p-2">Item Name</th>
                <th className="border border-gray-600 p-2">Quantity</th>
                <th className="border border-gray-600 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="text-center bg-gray-900 hover:bg-gray-800">
                  <td className="border border-gray-700 p-2">{item.name}</td>
                  <td className="border border-gray-700 p-2">{item.quantity}</td>
                  <td
                    className={`border border-gray-700 p-2 font-bold ${
                      item.status === "Low Stock" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
            Add Stock
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
            Remove Stock
          </button>
        </div>
      </div>
    </div>
  );
}