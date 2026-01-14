'use client';

import { useState } from 'react';

export default function AssetsPage() {
  const [assets] = useState([
    { id: '1', name: 'Summer_Sale_Banner.png', type: 'image', size: '2.4 MB', campaign: 'Summer Sale 2024', created: '2 hours ago' },
    { id: '2', name: 'Product_Video.mp4', type: 'video', size: '45.8 MB', campaign: 'Product Launch', created: '1 day ago' },
    { id: '3', name: 'Email_Template.html', type: 'text', size: '12 KB', campaign: 'Holiday Campaign', created: '3 days ago' },
    { id: '4', name: 'Social_Post_1.jpg', type: 'image', size: '1.8 MB', campaign: 'Summer Sale 2024', created: '5 hours ago' },
  ]);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'text': return '📄';
      default: return '📁';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'text': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets Library</h1>
          <p className="text-gray-600 mt-2">Manage all your generated assets</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all">
          Upload Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Assets</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{assets.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Images</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {assets.filter(a => a.type === 'image').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Videos</div>
          <div className="text-3xl font-bold text-red-600 mt-2">
            {assets.filter(a => a.type === 'video').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Storage Used</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">52 MB</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Asset</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Size</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Campaign</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getTypeIcon(asset.type)}</div>
                      <div className="font-medium text-gray-900">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(asset.type)}`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {asset.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset.campaign}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {asset.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">Download</button>
                    <button className="text-gray-600 hover:text-gray-800">Preview</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
