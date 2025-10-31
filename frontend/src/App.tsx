import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Navbar onSearch={setSearchTerm} />
      <Outlet context={{ searchTerm }} />
    </div>
  );
};

export default App;
