import { useState } from "react";
import { Menu, Grid, Box, BarChart } from "lucide-react";
import { FiArrowLeft, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BubbleController,
} from "chart.js";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import items from "./items.json";

export default function Operator() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    BubbleController
  );

  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const categoryLabels = Object.keys(categoryCounts);
  const categoryValues = Object.values(categoryCounts);

  const statusCounts = items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + item.quantity;
    return acc;
  }, {});

  const statusLabels = Object.keys(statusCounts);
  const statusValues = Object.values(statusCounts);

  const categoryData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Inventory Category Distribution",
        data: categoryValues,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  const stockStatusData = {
    labels: statusLabels,
    datasets: [
      {
        label: "Stock Levels",
        data: statusValues,
        backgroundColor: ["#4CAF50", "#db3030"],
      },
    ],
  };

  const departmentCount = items.reduce((acc, item) => {
    acc[item.department] = (acc[item.department] || 0) + item.total_value;
    return acc;
  }, {});

  const departmentLabels = Object.keys(departmentCount);
  const departmentValues = Object.values(departmentCount);

  const departmentValueData = {
    labels: departmentLabels,
    datasets: [
      {
        label: "Total Inventory Value (₹)",
        data: departmentValues,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="flex bg-gray-900 text-white w-full">
      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 w-72 bg-gray-800 p-5 shadow-lg transform transition-transform md:relative md:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-300">Operator Panel</h2>
        <ul className="space-y-4">
          <button className="flex items-center gap-2 p-3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                  <FiArrowLeft size={24} />
                </button>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Grid size={20} /> <Link to="/operator/">Dashboard</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Box size={20} /> <Link to="/operator/inventory">Manage Inventory</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <BarChart size={20} /> <Link to="/operator/reports">Reports</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center">
          <button className="mr-4 md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Operator Reports</h1>
        </header>

        {/* Inventory Overview */}
        <div className="mt-6 bg-gray-800 p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center">Inventory Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-300 text-center mb-2">Category Distribution</h3>
              <Pie data={categoryData} />
            </div>

            <div className="bg-gray-900 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-300 text-center mb-2">Stock Levels</h3>
              <Doughnut data={stockStatusData} />
            </div>

            <div className="bg-gray-900 p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-medium text-gray-300 text-center mb-2">Departmental Inventory Value</h3>
              <Bar data={departmentValueData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
