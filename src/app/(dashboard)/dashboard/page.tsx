'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {session?.user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm font-medium text-gray-600">Total Campaigns</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">12</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm font-medium text-gray-600">Templates</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">8</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm font-medium text-gray-600">Assets</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">156</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="text-sm font-medium text-gray-600">Users</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">5</div>
        </div>
      </div>
    </div>
  );
}
