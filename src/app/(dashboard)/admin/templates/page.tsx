'use client';

import { useState } from 'react';
import Modal from '@/components/modals/modal';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { 
      id: '1', 
      name: 'Social Media Post', 
      type: 'image', 
      category: 'Social',
      uses: 45,
      description: 'Optimized for Instagram, Facebook, and Twitter',
      active: true 
    },
    { 
      id: '2', 
      name: 'Video Ad Script', 
      type: 'video', 
      category: 'Advertising',
      uses: 23,
      description: '30-second video ad template with call-to-action',
      active: true 
    },
    { 
      id: '3', 
      name: 'Email Campaign', 
      type: 'text', 
      category: 'Email',
      uses: 67,
      description: 'Professional email marketing template',
      active: true 
    },
    { 
      id: '4', 
      name: 'Blog Post', 
      type: 'text', 
      category: 'Content',
      uses: 34,
      description: 'SEO-optimized blog post structure',
      active: true 
    },
    { 
      id: '5', 
      name: 'Product Showcase', 
      type: 'image', 
      category: 'E-commerce',
      uses: 12,
      description: 'Product photography template with annotations',
      active: false 
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'image',
    category: 'Social',
    description: ''
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'image': return 'bg-purple-100 text-purple-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'text': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreate = () => {
    const newTemplate = {
      id: String(templates.length + 1),
      ...formData,
      uses: 0,
      active: true
    };
    setTemplates([...templates, newTemplate]);
    setShowCreateModal(false);
    setFormData({ name: '', type: 'image', category: 'Social', description: '' });
    alert('✅ Template created successfully!');
  };

  const handleEdit = (template: any) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      category: template.category,
      description: template.description
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setTemplates(templates.map(t => 
      t.id === selectedTemplate.id 
        ? { ...t, ...formData }
        : t
    ));
    setShowEditModal(false);
    alert('✅ Template updated successfully!');
  };

  const handleToggleActive = (template: any) => {
    setTemplates(templates.map(t => 
      t.id === template.id 
        ? { ...t, active: !t.active }
        : t
    ));
    alert(`✅ Template ${!template.active ? 'activated' : 'deactivated'}!`);
  };

  const handleUseTemplate = (template: any) => {
    alert(`Using template: ${template.name}\n\nThis would redirect to campaign creation with this template pre-selected.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600 mt-2">Manage campaign templates and content structures</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          + Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Templates</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{templates.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Active</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {templates.filter(t => t.active).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Uses</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {templates.reduce((sum, t) => sum + t.uses, 0)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Categories</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                  {template.type}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {template.category}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{template.uses}</span> uses
                </div>
                <div>
                  {template.active ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-semibold">Active</span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full font-semibold">Inactive</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-semibold"
                >
                  Use Template
                </button>
                <div className="relative group">
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-semibold">
                    •••
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                    <button 
                      onClick={() => handleEdit(template)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit Template
                    </button>
                    <button 
                      onClick={() => handleToggleActive(template)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {template.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Template">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Instagram Story Template"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="Social">Social</option>
              <option value="Advertising">Advertising</option>
              <option value="Email">Email</option>
              <option value="Content">Content</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Brief description of the template..."
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Template
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Template">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="Social">Social</option>
              <option value="Advertising">Advertising</option>
              <option value="Email">Email</option>
              <option value="Content">Content</option>
              <option value="E-commerce">E-commerce</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
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
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
