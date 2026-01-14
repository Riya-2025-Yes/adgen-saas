'use client';

import { useState } from 'react';

export default function ProvidersPage() {
  const [providers] = useState([
    { id: '1', name: 'OpenAI GPT-4', type: 'llm', status: 'connected', lastUsed: '2 hours ago' },
    { id: '2', name: 'Claude AI', type: 'llm', status: 'connected', lastUsed: '1 day ago' },
    { id: '3', name: 'DALL-E 3', type: 'image', status: 'connected', lastUsed: '5 hours ago' },
    { id: '4', name: 'Gemini Pro', type: 'llm', status: 'disconnected', lastUsed: 'Never' },
    { id: '5', name: 'Stable Diffusion', type: 'image', status: 'connected', lastUsed: '1 week ago' },
    { id: '6', name: 'Runway ML', type: 'video', status: 'disconnected', lastUsed: 'Never' },
  ]);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'llm': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'llm': return '💬';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      default: return '⚙️';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Providers</h1>
          <p className="text-gray-600 mt-2">Manage your AI service connections</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-semibold shadow-lg hover:shadow-xl transition-all">
          + Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Connected Providers</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {providers.filter(p => p.status === 'connected').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">LLM Providers</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {providers.filter(p => p.type === 'llm').length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Image Providers</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {providers.filter(p => p.type === 'image').length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getTypeIcon(provider.type)}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getTypeColor(provider.type)}`}>
                      {provider.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {provider.status === 'connected' ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-600">Connected</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-500">Disconnected</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Used:</span>
                  <span className="text-gray-900 font-medium">{provider.lastUsed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">API Status:</span>
                  <span className="text-green-600 font-medium">✓ Active</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                {provider.status === 'connected' ? (
                  <>
                    <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-semibold">
                      Configure
                    </button>
                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-semibold">
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-semibold">
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Need Help Configuring Providers?</h3>
            <p className="text-sm text-blue-800 mb-3">
              Each AI provider requires API keys and specific configuration. Visit our documentation to learn how to set up each provider.
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              View Documentation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
