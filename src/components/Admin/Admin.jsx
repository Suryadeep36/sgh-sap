import { useState } from "react";
import { Menu, FileText, Box, ClipboardList } from "lucide-react";

function PurchaseRequest({ request }) {
  return (
    <div className="bg-gray-700 p-6 shadow-xl rounded-xl text-left w-full border border-gray-600 hover:shadow-2xl transition-shadow">
      <h3 className="text-lg font-semibold text-blue-300">{request.staffName}</h3>
      <p className="text-gray-200">Item: <span className="font-medium">{request.item}</span></p>
      <p className="text-gray-200">Quantity: {request.quantity}</p>
      <p className="text-gray-200">Reason: {request.reason}</p>
      <p className="text-gray-400">Date: {request.date}</p>
      <div className="mt-3 flex gap-2">
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition">Approve</button>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition">Reject</button>
      </div>
    </div>
  );
}

function StockItem({ stock }) {
  return (
    <div className="bg-gray-700 p-6 shadow-xl rounded-xl text-left w-full border border-gray-600 hover:shadow-2xl transition-shadow">
      <h3 className="text-lg font-semibold text-green-300">{stock.item}</h3>
      <p className="text-gray-200">Quantity: {stock.quantity}</p>
      <p className="text-gray-200">Location: {stock.location}</p>
      <p className="text-gray-400">Last Updated: {stock.lastUpdated}</p>
    </div>
  );
}

function OrderItem({ order }) {
  return (
    <div className="bg-gray-700 p-6 shadow-xl rounded-xl text-left w-full border border-gray-600 hover:shadow-2xl transition-shadow">
      <h3 className="text-lg font-semibold text-yellow-300">{order.item}</h3>
      <p className="text-gray-200">Quantity: {order.quantity}</p>
      <p className="text-gray-200">Status: <span className={`font-medium ${order.status === 'Approved' ? 'text-green-300' : 'text-red-300'}`}>{order.status}</span></p>
      <p className="text-gray-200">Ordered By: {order.orderedBy}</p>
      <p className="text-gray-400">Expected Delivery: {order.expectedDelivery}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showStock, setShowStock] = useState(false);
  const [showRequests, setShowRequests] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const requests = [
    { staffName: "Alice Johnson", item: "High-End GPU", quantity: 1, reason: "For AI research lab", date: "2025-03-13" },
    { staffName: "Bob Williams", item: "Mechanical Keyboards", quantity: 10, reason: "For programming labs", date: "2025-03-12" },
    { staffName: "Carol Smith", item: "RAM 32GB", quantity: 5, reason: "For server upgrade", date: "2025-03-10" }
  ];
  const stock = [
    { item: "Workstation PCs", quantity: 15, location: "IT Lab A", lastUpdated: "2025-03-10" },
    { item: "Server Racks", quantity: 5, location: "Data Center", lastUpdated: "2025-03-11" },
    { item: "Laptops", quantity: 12, location: "Faculty Office", lastUpdated: "2025-03-09" }
  ];
  const orders = [
    { item: "SSD 1TB", quantity: 20, status: "Approved", orderedBy: "IT Department", expectedDelivery: "2025-03-15" },
    { item: "Network Switch", quantity: 5, status: "Pending", orderedBy: "Network Team", expectedDelivery: "2025-03-18" },
    { item: "Monitors 24-inch", quantity: 8, status: "Approved", orderedBy: "Multimedia Lab", expectedDelivery: "2025-03-20" }
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white w-full">
      <div className={`bg-gray-800 w-72 p-5 shadow-lg ${isSidebarOpen ? "block" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-300">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => { setShowRequests(true); setShowStock(false); setShowOrders(false); }}>
            <FileText size={20} /> Requests
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => { setShowStock(true); setShowRequests(false); setShowOrders(false); }}>
            <Box size={20} /> Current Stock
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition" onClick={() => { setShowOrders(true); setShowRequests(false); setShowStock(false); }}>
            <ClipboardList size={20} /> Orders
          </li>
        </ul>
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="bg-gray-700 p-5 shadow-md flex justify-between items-center w-full border-b border-gray-600">
          <button className="p-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-300">{showRequests ? "Requests" : showStock ? "Current Stock" : "Orders"}</h1>
        </div>
        <div className="p-8 grid grid-cols-2 gap-8 w-full">
          {showRequests && requests.map((request, index) => (
            <PurchaseRequest key={index} request={request} />
          ))}
          {showStock && stock.map((stockItem, index) => (
            <StockItem key={index} stock={stockItem} />
          ))}
          {showOrders && orders.map((order, index) => (
            <OrderItem key={index} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
