'use client';

export default function Analytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics & Insikter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Spend per leverantör</h2>
          <div className="h-64 border-dashed border-4 flex items-center justify-center">
            <p>Graf här (Recharts i produktion)</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">AI-insikter</h2>
          <p className="text-lg">Du kan spara ca 500 kr i avgifter genom att förlänga Telavox-fakturor med FortusFlex.</p>
        </div>
      </div>
    </div>
  );
}
