import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg w-96">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Inventory Hub
        </motion.h1>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link
            to="/admin"
            className="block w-full px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Admin Panel
          </Link>
          <Link
            to="/operator"
            className="block w-full px-6 py-3 bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Operator Panel
          </Link>
        </motion.div>
      </div>
    </div>
  );
}