'use client';

import { useState } from 'react';

export default function WhiteLabelPage() {
  const [tenants] = useState([
    { id: '1', name: 'Demo Tenant', primaryColor: '#3B82F6' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">White-Label Branding</h1>
      <p className="text-gray-600">Configure per-tenant UI (SystemAdmin only)</p>

      {tenants.map(tenant => (
        <div key={tenant.id} className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-4">{tenant.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input type="color" value={tenant.primaryColor} className="w-full h-12" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
