import React from 'react';
import logo from './logo.svg';
import { AnimatePresence } from "framer-motion";
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/home";

function App() {
  return (
    <main className="font-sans">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </AnimatePresence>
      {/* <FPSStats /> */}
    </main>
  );
}

export default App;
