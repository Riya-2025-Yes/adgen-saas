'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BrandKitPage() {
  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937'
  });

  const [tone, setTone] = useState('Professional');
  const [voiceGuidelines, setVoiceGuidelines] = useState('Clear, concise, and professional communication that builds trust with our audience.');
  const [isSaving, setIsSaving] = useState(false);
  
  // Logo states
  const [primaryLogo, setPrimaryLogo] = useState<string | null>(null);
  const [secondaryLogo, setSecondaryLogo] = useState<string | null>(null);
  const [iconLogo, setIconLogo] = useState<string | null>(null);

  const handleColorChange = (colorName: string, newColor: string) => {
    setColors({ ...colors, [colorName]: newColor });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('✅ Brand kit saved successfully!');
    }, 1000);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    logoType: 'primary' | 'secondary' | 'icon'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('❌ Please upload an image file (PNG, JPG, SVG)');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ File size must be less than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        switch (logoType) {
          case 'primary':
            setPrimaryLogo(result);
            break;
          case 'secondary':
            setSecondaryLogo(result);
            break;
          case 'icon':
            setIconLogo(result);
            break;
        }
        
        alert(`✅ ${logoType.charAt(0).toUpperCase() + logoType.slice(1)} logo uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (inputId: string) => {
    document.getElementById(inputId)?.click();
  };

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
          </div>
          <div className="space-y-3">
            {Object.entries(colors).map(([name, color]) => (
              <div key={name} className="flex items-center gap-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(name, e.target.value)}
                  className="w-16 h-16 rounded-lg shadow-md cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 capitalize">{name}</div>
                  <div className="text-sm text-gray-600 font-mono">{color}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Typography</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Heading Font</div>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Inter Bold</option>
                <option>Roboto Bold</option>
                <option>Montserrat Bold</option>
              </select>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600 mb-2">Body Font</div>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Inter Regular</option>
                <option>Roboto Regular</option>
                <option>Open Sans</option>
              </select>
            </div>
          </div>
        </div>

        {/* Brand Voice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Brand Voice & Tone</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option>Professional</option>
                <option>Casual</option>
                <option>Friendly</option>
                <option>Authoritative</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice Guidelines</label>
              <textarea 
                value={voiceGuidelines}
                onChange={(e) => setVoiceGuidelines(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Logos & Assets */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Logos & Assets</h2>
            <button 
              onClick={() => triggerFileInput('primary-logo-input')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Upload
            </button>
          </div>
          <div className="space-y-4">
            {/* Primary Logo Upload */}
            <input
              id="primary-logo-input"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'primary')}
              className="hidden"
            />
            <button 
              onClick={() => triggerFileInput('primary-logo-input')}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
            >
              {primaryLogo ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-3 rounded-xl overflow-hidden">
                    <img src={primaryLogo} alt="Primary Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Primary Logo</div>
                  <div className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    Click to replace
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                    AG
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Primary Logo</div>
                  <div className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                    Click to upload
                  </div>
                </div>
              )}
            </button>

            <div className="grid grid-cols-2 gap-4">
              {/* Secondary Logo */}
              <input
                id="secondary-logo-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'secondary')}
                className="hidden"
              />
              <button 
                onClick={() => triggerFileInput('secondary-logo-input')}
                className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50"
              >
                {secondaryLogo ? (
                  <>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden">
                      <img src={secondaryLogo} alt="Secondary Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs text-gray-600">Secondary Logo</div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <div className="text-xs text-gray-600">Secondary Logo</div>
                    <div className="text-xs text-blue-600 mt-1">Upload</div>
                  </>
                )}
              </button>

              {/* Icon Logo */}
              <input
                id="icon-logo-input"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'icon')}
                className="hidden"
              />
              <button 
                onClick={() => triggerFileInput('icon-logo-input')}
                className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50"
              >
                {iconLogo ? (
                  <>
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden">
                      <img src={iconLogo} alt="Icon" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-xs text-gray-600">Icon</div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <div className="text-xs text-gray-600">Icon</div>
                    <div className="text-xs text-blue-600 mt-1">Upload</div>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 text-sm">ℹ️</div>
              <div className="text-xs text-blue-800">
                <strong>Accepted formats:</strong> PNG, JPG, SVG<br />
                <strong>Max size:</strong> 5MB per file<br />
                <strong>Recommended:</strong> Square images (1:1 ratio)
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
              <button 
                onClick={() => alert('Add more forbidden words')}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
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
              <button 
                onClick={() => alert('Add more hashtags')}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
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
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
