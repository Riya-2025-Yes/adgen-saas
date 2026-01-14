'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CampaignsPage() {
  const [campaigns] = useState([
    { 
      id: '1', 
      name: 'Summer Sale 2024', 
      status: 'completed', 
      assets: 12, 
      template: 'Social Media Post',
      created: '2 days ago',
      progress: 100 
    },
    { 
      id: '2', 
      name: 'Product Launch Campaign', 
      status: 'in-progress', 
      assets: 5, 
      template: 'Video Ad',
      created: '1 week ago',
      progress: 65 
    },
    { 
      id: '3', 
      name: 'Holiday Special', 
      status: 'draft', 
      assets: 0, 
      template: 'Email Template',
      created: '3 weeks ago',
      progress: 0 
    },
    { 
      id: '4', 
      name: 'Brand Awareness Q1', 
      status: 'in-progress', 
      assets: 8, 
      template: 'Multi-channel',
      created: '5 days ago',
      progress: 45 
    },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-2">Create and manage your advertising campaigns</p>
        </div>
        <Link 
          href="/campaigns/new"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          + Create Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Campaigns</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{campaigns.length}</div>
          <div className="text-sm text-green-600 mt-2">+2 this month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">In Progress</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {campaigns.filter(c => c.status === 'in-progress').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Completed</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {campaigns.filter(c => c.status === 'completed').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Assets</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {campaigns.reduce((sum, c) => sum + c.assets, 0)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Template:</span>
                  <span className="font-medium text-gray-900">{campaign.template}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Assets:</span>
                  <span className="font-medium text-gray-900">{campaign.assets} generated</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-600">{campaign.created}</span>
                </div>
              </div>

              {campaign.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-semibold transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
