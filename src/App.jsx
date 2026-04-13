import { useState } from 'react';
import watchData from './watches.json';

const JPY_TO_INR = 0.585; 

function App() {
  const [search, setSearch] = useState("");

  const filtered = watchData.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) || 
    w.jdm_model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <nav className="bg-slate-900 text-white border-b sticky top-0 z-50 p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Watch List</h1>
          </div>
          <input 
            type="text" 
            placeholder="Search models..." 
            className="w-full md:w-80 p-2 rounded bg-slate-800 border border-slate-700 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(watch => {
          const retailJPY = watch.price_jpy || 0;
          const dutyFreeJPY = Math.round(retailJPY / 1.1);
          const dutyFreeInINR = Math.round(dutyFreeJPY * JPY_TO_INR);
          const indiaPrice = watch.price_india_inr || 0;
          const savings = indiaPrice - dutyFreeInINR;

          return (
            <div key={watch.id} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
              {/* Product Image */}
              <div className="p-8 bg-white aspect-square flex items-center justify-center relative border-b border-slate-100">
                <img 
                  src={`${import.meta.env.BASE_URL}${watch.image}`} 
                  alt={watch.name}
                  className="max-h-full object-contain drop-shadow-xl"
                />
                <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {watch.jdm_model}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <h2 className="text-xl font-bold leading-tight">{watch.name}</h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold italic">
                    {watch.intl_model}
                  </p>
                </div>

                {/* Technical Specs Section */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs border-y py-3 border-slate-100">
                  <div>
                    <span className="text-slate-400 block uppercase font-bold text-[9px]">Mechanism</span>
                    <span className="font-semibold text-slate-700">{watch.movement}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-bold text-[9px]">Glass</span>
                    <span className="font-semibold text-slate-700">{watch.glass}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Japan Pricing Box */}
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-black text-emerald-800 tracking-widest text-center">Japan Deal</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">-10% TAX FREE</span>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[9px] text-slate-400 uppercase font-bold">List Price</p>
                          <p className="text-sm line-through text-slate-400">¥{retailJPY.toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] text-emerald-600 uppercase font-bold text-center">You Pay</p>
                          <p className="text-2xl font-black text-emerald-700">¥{dutyFreeJPY.toLocaleString()}</p>
                       </div>
                    </div>
                  </div>

                  {/* Comparison Row */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <p className="text-[9px] uppercase font-bold text-slate-400">Converted</p>
                      <p className="font-bold text-slate-700">₹{dutyFreeInINR.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <p className="text-[9px] uppercase font-bold text-slate-400">India MSRP</p>
                      <p className="font-bold text-slate-700">₹{indiaPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Savings Highlight */}
                  <div className="bg-blue-600 text-white p-3 rounded-xl text-center shadow-md">
                    <p className="text-[10px] uppercase font-bold opacity-70">Total Savings</p>
                    <p className="text-xl font-black">₹{savings.toLocaleString()}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-6 flex flex-col gap-2">
                  <a 
                    href={watch.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors"
                  >
                    Official Seiko JP ↗
                  </a>
                  <a 
                    href={watch.yodobashi_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-center py-2.5 bg-white text-red-600 border border-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors"
                  >
                    Check Yodobashi Stock 📦
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <footer className="text-center p-12 text-slate-400 text-[10px] uppercase tracking-[0.2em]">
        Currency Rate: 1 JPY = ₹{JPY_TO_INR} • Data Correct for April 2026
      </footer>
    </div>
  );
}

export default App;