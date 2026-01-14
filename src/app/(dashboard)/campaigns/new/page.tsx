'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    template: '',
    brandKit: '',
    targetChannels: [] as string[],
  });

  const templates = ['Social Media Post', 'Video Ad', 'Email Campaign', 'Blog Post', 'Landing Page'];
  const brandKits = ['Default Brand', 'Summer Theme', 'Corporate Style'];
  const channels = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Email', 'Blog'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, would call API
    alert('Campaign created! (Demo mode)');
    router.push('/campaigns');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-2">Set up your advertising campaign</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Campaign Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Summer Sale 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your campaign objectives..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template *
              </label>
              <select
                required
                value={formData.template}
                onChange={(e) => setFormData({...formData, template: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a template</option>
                {templates.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Kit
              </label>
              <select
                value={formData.brandKit}
                onChange={(e) => setFormData({...formData, brandKit: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a brand kit</option>
                {brandKits.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Target Channels</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {channels.map(channel => (
              <label key={channel} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-3 w-4 h-4 text-blue-600"
                  checked={formData.targetChannels.includes(channel)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({...formData, targetChannels: [...formData.targetChannels, channel]});
                    } else {
                      setFormData({...formData, targetChannels: formData.targetChannels.filter(c => c !== channel)});
                    }
                  }}
                />
                <span className="text-sm font-medium text-gray-900">{channel}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
}
