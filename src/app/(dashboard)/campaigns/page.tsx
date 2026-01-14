'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/modals/modal';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
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

  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    template: '',
    status: ''
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowViewModal(true);
  };

  const handleEdit = (campaign: any) => {
    setSelectedCampaign(campaign);
    setEditFormData({
      name: campaign.name,
      template: campaign.template,
      status: campaign.status
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setCampaigns(campaigns.map(c => 
      c.id === selectedCampaign.id 
        ? { ...c, name: editFormData.name, template: editFormData.template, status: editFormData.status }
        : c
    ));
    setShowEditModal(false);
    alert('✅ Campaign updated successfully!');
  };

  const handleDelete = (campaign: any) => {
    if (confirm(`Are you sure you want to delete "${campaign.name}"?`)) {
      setCampaigns(campaigns.filter(c => c.id !== campaign.id));
      alert('✅ Campaign deleted successfully!');
    }
  };

  const handleDuplicate = (campaign: any) => {
    const newCampaign = {
      ...campaign,
      id: String(campaigns.length + 1),
      name: `${campaign.name} (Copy)`,
      created: 'Just now'
    };
    setCampaigns([...campaigns, newCampaign]);
    alert('✅ Campaign duplicated successfully!');
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
                <button 
                  onClick={() => handleViewDetails(campaign)}
                  className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold transition-colors"
                >
                  View Details
                </button>
                <div className="relative group">
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-semibold transition-colors">
                    •••
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                    <button 
                      onClick={() => handleEdit(campaign)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit Campaign
                    </button>
                    <button 
                      onClick={() => handleDuplicate(campaign)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Duplicate
                    </button>
                    <button 
                      onClick={() => handleDelete(campaign)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Campaign Details">
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Campaign Name</div>
                <div className="font-semibold text-gray-900">{selectedCampaign.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Status</div>
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCampaign.status)}`}>
                  {selectedCampaign.status}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Template</div>
                <div className="font-semibold text-gray-900">{selectedCampaign.template}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Assets Generated</div>
                <div className="font-semibold text-gray-900">{selectedCampaign.assets}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Created</div>
                <div className="text-gray-900">{selectedCampaign.created}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Progress</div>
                <div className="text-gray-900">{selectedCampaign.progress}%</div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Generated Assets</h3>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(selectedCampaign.assets)].map((_, i) => (
                  <div key={i} className="p-3 border border-gray-200 rounded-lg flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div>
                      <div className="text-sm font-medium">Asset {i + 1}</div>
                      <div className="text-xs text-gray-600">Generated</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Campaign">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
            <input
              type="text"
              value={editFormData.template}
              onChange={(e) => setEditFormData({...editFormData, template: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
