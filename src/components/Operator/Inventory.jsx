import { useState } from "react";
import { Menu, Grid, Box, BarChart } from "lucide-react";
import { FiMenu,FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import requestItems from "./requestItems.json";
import tendors from "./tendors.json";
export default function Operator() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [requests, setRequests] = useState(requestItems);
  const [tendor, setTendor] = useState(tendors);
  const [filter, setFilter] = useState("All");
  const [inventory, setInventory] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const handleStatusChange = (id, value) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: value } : req))
    );
  };
  const addToInventory = (tender) => {
    setInventory((prev) => [...prev, ...tender.items]);
  };

  const filteredRequests = requests.filter(
    (req) => filter === "All" || req.status === filter
  );

  return (
    <div className="flex bg-gray-900 text-white w-full  overflow-hidden">
      {/* Sidebar */}
      <div
  className={`bg-gray-800 w-72 p-5 shadow-lg fixed h-full top-0 left-0 transform ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } transition-transform duration-300 z-50 md:relative md:translate-x-0`}
>
        <h2 className="text-2xl font-bold mb-6 text-gray-300">
          Operator Panel
        </h2>
        <ul className="space-y-4">
             <button className="flex items-center gap-2 p-3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <FiArrowLeft size={24} />
                          </button>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Grid size={20} /> <Link to="/operator/">Dashboard</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <Box size={20} />{" "}
            <Link to="/operator/inventory">Manage Inventory</Link>
          </li>
          <li className="flex items-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition">
            <BarChart size={20} /> <Link to="/operator/reports">Reports</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:flex-1 p-6 bg-gray-900 text-white">
        <div className="p-6 bg-gray-900 text-white">
          <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md flex items-center">
            <button
              className="mr-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-semibold">Operator Dashboard</h1>
          </header>

          {/* Filter Buttons */}
          <div className="mt-6 flex gap-4 mb-4 overflow-x-auto">
            {["All", "Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  filter === status ? "bg-blue-600" : "bg-gray-700"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Requests Table */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 text-white">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="border border-gray-600 p-2">Item Name</th>
                  <th className="border border-gray-600 p-2">
                    Requested Quantity
                  </th>
                  <th className="border border-gray-600 p-2">
                    Price (per piece)
                  </th>
                  <th className="border border-gray-600 p-2">Total Price</th>
                  <th className="border border-gray-600 p-2">Department</th>
                  <th className="border border-gray-600 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="text-center bg-gray-900 hover:bg-gray-800"
                  >
                    <td className="border border-gray-700 p-2">{req.name}</td>
                    <td className="border border-gray-700 p-2">
                      {req.quantity}
                    </td>
                    <td className="border border-gray-700 p-2">
                      {req["price (per piece)"]}
                    </td>
                    <td className="border border-gray-700 p-2">
                      {req.total_value}
                    </td>
                    <td className="border border-gray-700 p-2">
                      {req.department}
                    </td>
                    <td className="border border-gray-700 p-2 font-bold">
                      <select
                        className={`bg-transparent border-none font-bold focus:outline-none ${
                          req.status === "Pending"
                            ? "text-yellow-500"
                            : req.status === "Approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                        value={req.status}
                        onChange={(e) =>
                          handleStatusChange(req.id, e.target.value)
                        }
                      >
                        <option value="Pending" className="text-yellow-500">
                          Pending
                        </option>
                        <option value="Approved" className="text-green-500">
                          Approved
                        </option>
                        <option value="Rejected" className="text-red-500">
                          Rejected
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="m-5">
            <h2 className="mt-2 text-2xl">Approved Items to create a tender</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700 text-white">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="border border-gray-600 p-2">Item Name</th>
                    <th className="border border-gray-600 p-2">
                      Requested Quantity
                    </th>
                    <th className="border border-gray-600 p-2">
                      Price (per piece)
                    </th>
                    <th className="border border-gray-600 p-2">Total Price</th>
                    <th className="border border-gray-600 p-2">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests
                    .filter((req) => req.status === "Approved")
                    .map((req) => (
                      <tr
                        key={req.id}
                        className="text-center bg-gray-900 hover:bg-gray-800"
                      >
                        <td className="border border-gray-700 p-2">
                          {req.name}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {req.quantity}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {req["price (per piece)"]}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {req.total_value}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {req.department}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Send Request Button */}
            <button
              className={`mt-4 px-6 py-2 text-lg font-semibold rounded-lg shadow-md transition 
      ${
        filteredRequests.some((req) => req.status === "Approved")
          ? "bg-blue-600 hover:bg-blue-500 text-white"
          : "bg-gray-500 cursor-not-allowed"
      }`}
              disabled={
                !filteredRequests.some((req) => req.status === "Approved")
              }
              onClick={() => alert("Tender request sent to Head!")}
            >
              Send Tender Request to Head
            </button>
          </div>
          <div className="m-5">
            <h2 className="mt-2 text-2xl">Previous Tender Requests to Head</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
              <table className="w-full border-collapse border border-gray-700 text-white">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="border border-gray-600 p-2">Tendor Name</th>
                    <th className="border border-gray-600 p-2">
                      Tendor Details
                    </th>
                    <th className="border border-gray-600 p-2">Status</th>
                    <th className="border border-gray-600 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tendor.map((req) => (
                    <tr
                      key={req.id}
                      className="text-center bg-gray-900 hover:bg-gray-800"
                    >
                      <td className="border border-gray-700 p-2">{req.name}</td>
                      <td
                        className="border border-gray-700 p-2 text-blue-400 cursor-pointer underline"
                        onClick={() => setSelectedTender(req)}
                      >
                        View Details
                      </td>
                      <td
                        className={`border border-gray-700 p-2 font-bold ${
                          req.status === "Approved"
                            ? "text-green-500"
                            : req.status === "Pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {req.status}
                      </td>
                      <td className="border border-gray-700 p-2">
                        {req.status === "Approved" && (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                            onClick={() => addToInventory(req)}
                          >
                            Add to Inventory
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selectedTender && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gray-800 text-white p-5 rounded-lg w-1/2">
                    <h2 className="text-xl font-bold mb-4">
                      {selectedTender.name} - Details
                    </h2>
                    <table className="w-full border-collapse border border-gray-700 text-white">
                      <thead>
                        <tr className="bg-gray-700 text-gray-300">
                          <th className="border border-gray-600 p-2">
                            Item Name
                          </th>
                          <th className="border border-gray-600 p-2">
                            Quantity
                          </th>
                          <th className="border border-gray-600 p-2">
                            Department
                          </th>
                          <th className="border border-gray-600 p-2">Price</th>
                          <th className="border border-gray-600 p-2">
                            Total Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTender.items.map((item) => (
                          <tr
                            key={item.id}
                            className="text-center bg-gray-900 hover:bg-gray-800"
                          >
                            <td className="border border-gray-700 p-2">
                              {item.name}
                            </td>
                            <td className="border border-gray-700 p-2">
                              {item.quantity}
                            </td>
                            <td className="border border-gray-700 p-2">
                              {item.department}
                            </td>
                            <td className="border border-gray-700 p-2">
                              {item["price (per piece)"]}
                            </td>
                            <td className="border border-gray-700 p-2">
                              {item.total_value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setSelectedTender(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <h2 className="mt-6 text-2xl text-white">Inventory</h2>
              <table className="w-full border-collapse border border-gray-700 text-white mt-3">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="border border-gray-600 p-2">Item Name</th>
                    <th className="border border-gray-600 p-2">Quantity</th>
                    <th className="border border-gray-600 p-2">Department</th>
                    <th className="border border-gray-600 p-2">Price</th>
                    <th className="border border-gray-600 p-2">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.length > 0 ? (
                    inventory.map((item, index) => (
                      <tr
                        key={index}
                        className="text-center bg-gray-900 hover:bg-gray-800"
                      >
                        <td className="border border-gray-700 p-2">
                          {item.name}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {item.quantity}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {item.department}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {item["price (per piece)"]}
                        </td>
                        <td className="border border-gray-700 p-2">
                          {item.total_value}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-400">
                        No items in inventory
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => alert("Updating Inventory...")}
                >
                  Update Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
