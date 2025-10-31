import React from "react";
import { Search } from "lucide-react";

interface NavbarProps {
  onSearch: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-4 bg-[#F9F9F9] shadow-[0px_2px_16px_0px_rgba(0,0,0,0.1)] transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png"
          alt="Highway Delite"
          className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300"
        />
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[460px]">
        <input
          type="text"
          placeholder="Search experiences"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-[#EDEDED] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD643] placeholder-gray-500 text-[#161616]"
        />
        <button className="flex items-center justify-center bg-[#FFD643] hover:bg-[#e6c138] text-[#161616] font-medium px-4 py-2 rounded-md transition">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
