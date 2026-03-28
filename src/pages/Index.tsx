import { useCollectData } from "@/hooks/useCollectData";
import { useState } from "react";

const Index = () => {
  useCollectData();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-end gap-4 px-4 py-3 text-sm">
        <a href="https://mail.google.com" className="text-[#5f6368] hover:underline">Gmail</a>
        <a href="https://www.google.com/imghp" className="text-[#5f6368] hover:underline">Images</a>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-6 h-6 text-[#5f6368]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        <button className="bg-[#1a73e8] text-white text-sm font-medium px-6 py-2 rounded hover:bg-[#1765cc] hover:shadow-md">
          Sign in
        </button>
      </nav>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        {/* Google Logo */}
        <div className="mb-8">
          <span className="text-[92px] font-normal select-none" style={{ fontFamily: "'Product Sans', Arial, sans-serif" }}>
            <span style={{ color: '#4285f4' }}>G</span>
            <span style={{ color: '#ea4335' }}>o</span>
            <span style={{ color: '#fbbc05' }}>o</span>
            <span style={{ color: '#4285f4' }}>g</span>
            <span style={{ color: '#34a853' }}>l</span>
            <span style={{ color: '#ea4335' }}>e</span>
          </span>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-[584px] px-4">
          <div className="flex items-center border border-[#dfe1e5] rounded-full px-4 py-3 hover:shadow-md hover:border-transparent focus-within:shadow-md focus-within:border-transparent transition-shadow">
            <svg className="w-5 h-5 text-[#9aa0a6] mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-base text-[#202124] bg-transparent"
              autoComplete="off"
            />
            <svg className="w-6 h-6 text-[#4285f4] ml-3 flex-shrink-0 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="submit"
              className="bg-[#f8f9fa] text-[#3c4043] text-sm px-4 py-2 rounded border border-[#f8f9fa] hover:shadow-md hover:border-[#dadce0] transition-shadow"
            >
              Google Search
            </button>
            <button
              type="button"
              onClick={() => window.location.href = 'https://www.google.com/doodles'}
              className="bg-[#f8f9fa] text-[#3c4043] text-sm px-4 py-2 rounded border border-[#f8f9fa] hover:shadow-md hover:border-[#dadce0] transition-shadow"
            >
              I'm Feeling Lucky
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-[#f2f2f2] text-[#70757a] text-sm">
        <div className="px-8 py-3 border-b border-[#dadce0]">Egypt</div>
        <div className="flex flex-col sm:flex-row justify-between px-8 py-3 gap-2">
          <div className="flex gap-6 justify-center sm:justify-start">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">How Search works</a>
          </div>
          <div className="flex gap-6 justify-center sm:justify-end">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
