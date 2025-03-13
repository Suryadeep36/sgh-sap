import { useState } from "react";
import { FiMenu, FiGrid, FiBox, FiBarChart, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
const Operator = () => {
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-blue-700 text-white transition-all duration-300 shadow-md ${
          isSidebarOpen ? "w-64 p-4" : "w-16 p-2"
        } md:relative`}
      >
        <button
          className="text-white mb-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FiChevronLeft size={24} className={`transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} />
        </button>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg cursor-pointer">
            <FiGrid size={24} /> {isSidebarOpen && <Link to="/operator-dashboard" className="ml-2">Dashboard</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg cursor-pointer">
            <FiBox size={24} /> {isSidebarOpen && <Link to="/operator-inventory" className="ml-2">Manage Inventory</Link>}
          </li>
          <li className="flex items-center gap-3 hover:bg-blue-600 p-2 rounded-lg cursor-pointer">
            <FiBarChart size={24} /> {isSidebarOpen && <Link to="/operator-reports" className="ml-2">Reports</Link>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-6 ${isSidebarOpen ? "md:ml-32" : "md:ml-16"}`}>
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <button
            className="md:hidden mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Operator Dashboard</h1>
        </header>

        {/* Inventory Overview */}
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Inventory Overview</h2>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td
                    className={`border p-2 ${
                      item.status === "Low Stock" ? "text-red-600" : "text-green-600"
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
};

export default Operator;
