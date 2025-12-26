import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GithubProfileRTK from "./components/GithubProfileRTK";
import GithubProfileThunk from "./components/GithubProfileThunk";

function App() {
  const [mode, setMode] = useState("rtk");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center p-6">
      <div className="w-full max-w-xl bg-gray-800 rounded-2xl p-6 shadow-xl space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">GitHub Profile App</h1>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="bg-gray-700 px-3 py-2 rounded-lg"
          >
            <option value="rtk">RTK Query</option>
            <option value="thunk">Redux Thunk</option>
          </select>
        </div>

        {/* Animated Mode Switch */}
        <AnimatePresence mode="wait">
          {mode === "rtk" && (
            <motion.div
              key="rtk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <GithubProfileRTK />
            </motion.div>
          )}

          {mode === "thunk" && (
            <motion.div
              key="thunk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <GithubProfileThunk />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default App;
