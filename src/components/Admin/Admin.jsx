import { useState, useEffect } from "react";
import { Menu, FileText, Package, BarChart } from "lucide-react";
import tendersData from "../Operator/tendors.json";
import stockData from "../Operator/items.json";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function TenderRequest({ tender }) {
  return (
    <div className="bg-gray-700 p-6 shadow-xl rounded-xl text-left w-full border border-gray-600 hover:shadow-2xl transition-shadow">
      <h3 className="text-lg font-semibold text-blue-300">{tender.name}</h3>
      <p className="text-gray-200">Status: <span className="font-medium">{tender.status}</span></p>
      <h4 className="text-gray-300 mt-4">Items:</h4>
      <ul className="list-disc list-inside text-gray-200">
        {tender.items.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity} pcs ({item.department})</li>
        ))}
      </ul>
    </div>
  );
}

function CurrentStock({ stock }) {
  return (
    <div className="bg-gray-700 p-6 shadow-xl rounded-xl text-left w-full border border-gray-600 hover:shadow-2xl transition-shadow">
      <h3 className="text-lg font-semibold text-green-300">{stock.name}</h3>
      <p className="text-gray-200">Quantity: <span className="font-medium">{stock.quantity}</span></p>
      <p className="text-gray-200">Department: <span className="font-medium">{stock.department}</span></p>
      <p className="text-gray-200">Status: <span className="font-medium">{stock.status}</span></p>
      <p className="text-gray-200">Category: <span className="font-medium">{stock.category}</span></p>
      <p className="text-gray-200">Price per piece: <span className="font-medium">₹{stock["price (per piece)"]}</span></p>
      <p className="text-gray-200">Total Value: <span className="font-medium">₹{stock.total_value}</span></p>
    </div>
  );
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("requests");
  const [tenders, setTenders] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    setTenders(tendersData);
    setStock(stockData);
  }, []);

  const categoryCounts = stock.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const departmentCounts = stock.reduce((acc, item) => {
    acc[item.department] = (acc[item.department] || 0) + item.total_value;
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Inventory Category Distribution",
        data: Object.values(categoryCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: "Department Inventory Value",
        data: Object.values(departmentCounts),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white m-0">
      <div className={`bg-gray-800 w-72 p-5 shadow-lg ${isSidebarOpen ? "block" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-300">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => setActiveSection("requests")}> <FileText size={20} /> Tenders </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => setActiveSection("stock")}> <Package size={20} /> Current Stock </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => setActiveSection("graph")}> <BarChart size={20} /> Graph </li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="bg-blue-600 p-5 shadow-md flex justify-center items-center w-full border-b border-blue-500">
          <h1 className="text-xl font-semibold text-white">Current Category: {activeSection}</h1>
        </div>
        <div className="p-8 grid grid-cols-2 gap-8 w-full h-full overflow-auto">
          {activeSection === "requests" && tenders.map((tender) => (
            <TenderRequest key={tender.id} tender={tender} />
          ))}
          {activeSection === "stock" && stock.map((item) => (
            <CurrentStock key={item.id} stock={item} />
          ))}
          {activeSection === "graph" && (
            <div className="bg-gray-800 p-6 shadow-md rounded-lg w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center">Inventory Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-300 text-center mb-2">Category Distribution</h3>
                  <Pie data={categoryData} />
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-300 text-center mb-2">Department Inventory Value</h3>
                  <Bar data={departmentData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
