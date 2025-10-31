import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [q, setQ] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const onSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (q.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setShowMobileSearch(false); // close after search on mobile
    }
  };

  return (
    <header
      className="sticky top-0 z-40 bg-[#F9F9F9]"
      style={{
        boxShadow: "0px 2px 16px 0px #0000001A",
      }}
    >
      {/* Desktop Navbar */}
      <div
        className="
          max-w-[1440px] mx-auto 
          flex items-center justify-between 
          px-4 sm:px-8 md:px-12 lg:px-[124px] 
          h-[72px] sm:h-[80px] lg:h-[87px]
        "
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Highway Delite"
          className="h-10 sm:h-12 lg:h-[55px] w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Search */}
        <form
          onSubmit={onSearch}
          className="hidden md:flex items-center gap-3 ml-auto"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search experiences"
            className="
              w-[320px] md:w-[400px] lg:w-[520px]
              h-10 sm:h-11 
              rounded-lg border border-gray-200 px-4 text-sm
              placeholder-gray-900 focus:outline-none 
              focus:ring-2 focus:ring-yellow-300 shadow-sm
            "
          />
          <button
            type="submit"
            className="
              h-10 sm:h-11 px-4 sm:px-5 
              rounded-lg bg-yellow-400 text-black font-medium 
              shadow-md hover:brightness-95
            "
          >
            Search
          </button>
        </form>

        {/* Mobile Search Icon */}
        <button
          className="md:hidden text-gray-700 hover:text-black"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          🔍
        </button>
      </div>

      {/* Mobile Search Bar (toggles open) */}
      {showMobileSearch && (
        <div className="md:hidden bg-[#F9F9F9] px-4 pb-4 animate-fadeIn">
          <form onSubmit={onSearch} className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search experiences"
              className="
                flex-1 h-10 rounded-lg border border-gray-200 px-4 text-sm
                placeholder-gray-900 focus:outline-none 
                focus:ring-2 focus:ring-yellow-300 shadow-sm
              "
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-yellow-400 text-black font-medium shadow-md hover:brightness-95"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
