import { useEffect, useState } from "react";
import { Menu, Grid, Box, BarChart } from "lucide-react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import items from "./items.json";

export default function Operator() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inventory, setInventory] = useState(items);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    const sortedInventory = [...inventory].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setInventory(sortedInventory);
  };
  return (
    <div className="flex bg-gray-900 text-white w-full">
      <div
        className={`bg-gray-800 w-72 p-5 shadow-lg ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-300">
          Operator Panel
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Grid size={20} /> <Link to="/operator-dashboard">Dashboard</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Box size={20} />{" "}
            <Link to="/operator-inventory">Manage Inventory</Link>
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
          <h1 className="text-2xl font-semibold">Operator Dashboard</h1>
        </header>

        {/* Inventory Overview */}
        <div className="mt-6 bg-gray-800 p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-300">
            Inventory Overview
          </h2>
          <div className="mb-4 flex gap-4">
        <button className="bg-blue-500 px-3 py-1 rounded text-white" onClick={() => handleSort("name")}>
          Sort by Item Name	
        </button>
        <button className="bg-blue-500 px-3 py-1 rounded text-white" onClick={() => handleSort("category")}>
          Sort by Category
        </button>
        <button className="bg-blue-500 px-3 py-1 rounded text-white" onClick={() => handleSort("department")}>
          Sort by Department
        </button>
        <button className="bg-blue-500 px-3 py-1 rounded text-white" onClick={() => handleSort("quantity")}>
          Sort by Quantity
        </button>
      </div>
          <table className="w-full border-collapse border border-gray-700 mt-2 text-white">
            <thead>
              <tr className="bg-gray-700 text-gray-300">
                <th className="border border-gray-600 p-2">Item Name</th>
                <th className="border border-gray-600 p-2">Quantity</th>
                <th className="border border-gray-600 p-2">Department</th>
                <th className="border border-gray-600 p-2">Category</th>
                <th className="border border-gray-600 p-2">
                  Price (Per Piece)
                </th>
                <th className="border border-gray-600 p-2">Total Value</th>
                <th className="border border-gray-600 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="text-center bg-gray-900 hover:bg-gray-800"
                >
                  <td className="border border-gray-700 p-2">{item.name}</td>
                  <td className="border border-gray-700 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {item.department}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-700 p-2">
                    ₹{item["price (per piece)"]}
                  </td>
                  <td className="border border-gray-700 p-2">
                    ₹{item.total_value}
                  </td>
                  <td
                    className={`border border-gray-700 p-2 font-bold ${
                      item.status === "Low Stock"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
