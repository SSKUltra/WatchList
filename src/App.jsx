import { useState } from 'react';
import watchData from './watches.json';

function App() {
  const [search, setSearch] = useState("");

  const filtered = watchData.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) || 
    w.jdm_model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white border-b sticky top-0 z-10 p-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold italic tracking-tight">Watch List</h1>
          <input 
            type="text" 
            placeholder="Search models..." 
            className="w-full md:w-64 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(watch => (
          <div key={watch.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-100">
              <img 
                src={`${import.meta.env.BASE_URL}${watch.image}`} 
                alt={watch.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{watch.name}</h2>
                <span className="bg-black text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest">{watch.movement}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 text-sm mb-6">
                <div>
                  <p className="text-gray-400 uppercase text-[10px]">JDM Model</p>
                  <p className="font-mono font-bold">{watch.jdm_model}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px]">International</p>
                  <p className="font-mono">{watch.intl_model}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px]">Crystal</p>
                  <p>{watch.glass}</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase text-[10px]">Colors</p>
                  <p>{watch.colors.join(', ')}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-dashed">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Japan Est.</p>
                  <p className="text-2xl font-black text-emerald-600">¥{watch.price_jpy.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">India Est.</p>
                  <p className="text-2xl font-black text-slate-400">₹{watch.price_inr.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;