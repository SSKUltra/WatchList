import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const JPY_TO_INR = 0.585;
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTa_4CEt-iQl1UXwYkSacOyx6foY6RGzg-6DsfIiAQ8mOQY0ky5Nj0B9gqf7iK3SoQ6qRT22rnuzc5v/pub?output=csv";

const getDirectDriveUrl = (url) => {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/(.+?)\//);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/u/0/d/${match[1]}`;
  }
  return url;
};

function App() {
  const [watchData, setWatchData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => setWatchData(results.data),
    });
  }, []);

  const filtered = watchData.filter(w => 
    w.name?.toLowerCase().includes(search.toLowerCase()) || 
    w.jdm_model?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] font-sans antialiased">
      {/* Tactical Header */}
      <nav className="bg-[#1F2833]/80 backdrop-blur-xl border-b border-cyan-900/30 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Watch<span className="text-cyan-400">List</span>
            </h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Filter by Reference ID..." 
              className="w-full bg-[#0B0C10] border border-slate-700 py-2.5 px-4 rounded-md text-sm text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-600"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.map((watch, index) => {
          const retailJPY = Number(watch.price_jpy) || 0;
          const dutyFreeJPY = Math.round(retailJPY / 1.1);
          const dutyFreeInINR = Math.round(dutyFreeJPY * JPY_TO_INR);
          const indiaPrice = Number(watch.price_india_inr) || 0;
          const savings = indiaPrice - dutyFreeInINR;

          return (
            <div key={index} className="group bg-[#1F2833] border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-cyan-500/50 transition-all duration-300 shadow-2xl">
              {/* Image Chamber */}
              <div className="relative p-10 bg-black/40 flex items-center justify-center overflow-hidden border-b border-slate-800">
                <img 
                  src={getDirectDriveUrl(watch.image)} 
                  alt={watch.name}
                  className="h-56 w-auto object-contain z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                />
                <div className="absolute top-4 left-4 bg-cyan-500 text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-tighter italic">
                  {watch.jdm_model}
                </div>
                <div className="absolute bottom-4 right-6 text-[48px] font-black text-white/[0.03] select-none italic">
                  {watch.movement?.slice(0, 4)}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-white tracking-tight uppercase leading-tight italic">{watch.name}</h2>
                  <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-black mt-1">Ref: {watch.intl_model}</p>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-black/20 rounded-md border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold mb-1">Movement</span>
                    <span className="text-xs font-mono text-slate-300">{watch.movement}</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-800 pl-4">
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold mb-1">Glass</span>
                    <span className="text-xs font-mono text-slate-300">{watch.glass}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Price Comparison Stack */}
                  <div className="bg-[#0B0C10] p-4 border-l-2 border-emerald-500 rounded-r-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Tax-Free (JPY)</span>
                      <span className="text-xs font-mono text-slate-500 line-through">¥{retailJPY.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-black text-emerald-400 font-mono">¥{dutyFreeJPY.toLocaleString()}</span>
                      <span className="text-sm font-bold text-emerald-600 tracking-tighter">≈ ₹{dutyFreeInINR.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Savings Analysis */}
                  <div className="bg-[#0B0C10] p-4 border-l-2 border-cyan-500 rounded-r-md">
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">Total Savings</span>
                       <span className="text-[9px] text-slate-500 uppercase">vs India MSRP</span>
                    </div>
                    <p className="text-2xl font-black text-white font-mono mt-1 tracking-tighter">₹{savings.toLocaleString()}</p>
                  </div>
                </div>

                {/* Industrial Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-2">
                  <a 
                    href={watch.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-3 text-[9px] uppercase tracking-[0.2em] font-black text-center border border-slate-700 hover:bg-white hover:text-black transition-all"
                  >
                    Specs
                  </a>
                  <a 
                    href={watch.yodobashi_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="py-3 text-[9px] uppercase tracking-[0.2em] font-black text-center bg-cyan-600 text-white hover:bg-cyan-400 transition-all"
                  >
                    Inventory
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="text-center py-20 px-6 border-t border-slate-900 mt-10">
        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-bold">
          Exchange-Auto: 1 JPY = ₹{JPY_TO_INR} • Terminal v4.26
        </p>
      </footer>
    </div>
  );
}

export default App;