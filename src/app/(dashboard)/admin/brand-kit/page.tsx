'use client';

import { useState } from 'react';

export default function BrandKitPage() {
  const [colors] = useState({
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937'
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Brand Kit</h1>
        <p className="text-gray-600 mt-2">Configure your brand guidelines and assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Colors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Brand Colors</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(colors).map(([name, color]) => (
              <div key={name} className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-lg shadow-md" 
                  style={{ backgroundColor: color }}
                ></div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 capitalize">{name}</div>
                  <div className="text-sm text-gray-600 font-mono">{color}</div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Typography</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Edit
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Heading Font</div>
              <div className="text-2xl font-bold text-gray-900">Inter Bold</div>
              <div className="text-xs text-gray-500 mt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Body Font</div>
              <div className="text-lg text-gray-900">Inter Regular</div>
              <div className="text-xs text-gray-500 mt-1">The quick brown fox jumps over the lazy dog</div>
            </div>
          </div>
        </div>

        {/* Brand Voice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Brand Voice & Tone</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Edit
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Professional</option>
                <option>Casual</option>
                <option>Friendly</option>
                <option>Authoritative</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice Guidelines</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
                placeholder="Describe your brand's voice and personality..."
                defaultValue="Clear, concise, and professional communication that builds trust with our audience."
              />
            </div>
          </div>
        </div>

        {/* Logos & Assets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Logos & Assets</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Upload
            </button>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                AG
              </div>
              <div className="text-sm text-gray-600 mb-2">Primary Logo</div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Replace
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <div className="text-xs text-gray-600">Secondary Logo</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                <div className="text-xs text-gray-600">Icon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forbidden Words/Phrases
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">spam</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">scam</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">fake</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                + Add More
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Hashtags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">#AdGen</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">#Innovation</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">#Marketing</span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                + Add More
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Disclaimers
            </label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
              placeholder="Add any required disclaimers for your content..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}
