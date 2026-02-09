'use client';

export default function Analytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-64 flex items-center justify-center border-dashed border-4">
          <p className="text-xl">Spend per leverantör (Recharts i produktion)</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-64 flex items-center justify-center border-dashed border-4">
          <p className="text-xl">AI-insikter (placeholder)</p>
        </div>
      </div>
    </div>
  );
}