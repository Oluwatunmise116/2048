import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import { Web3ModalProvider } from "./wallet/web3modal";

function App() {
  return (
    <div className="App">
      <Web3ModalProvider>
        <BrowserRouter>
          <Navbar />
          <div className="page-wrap">
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Navigate to="/game" replace />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </Web3ModalProvider>
    </div>
  );
}
export default App;
