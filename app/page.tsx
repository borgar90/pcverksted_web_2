"use client"

import SalesChart from '@/components/SalesChart';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Inventory Management Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-[300px]">
          <SalesChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {/* Add summary cards or quick access buttons here if needed */}
      </div>
    </div>
  );
}