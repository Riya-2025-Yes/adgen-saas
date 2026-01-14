'use client';

import { useState } from 'react';
import Modal from '@/components/modals/modal';

export default function TenantsPage() {
  const [tenants, setTenants] = useState([
    { id: '1', name: 'Demo Tenant', slug: 'demo-tenant', users: 5, campaigns: 12, status: 'active' },
    { id: '2', name: 'Acme Corp', slug: 'acme-corp', users: 12, campaigns: 34, status: 'active' },
    { id: '3', name: 'TechStart Inc', slug: 'techstart', users: 8, campaigns: 21, status: 'active' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    displayName: '',
    primaryColor: '#3B82F6'
  });

  const handleCreate = () => {
    const newTenant = {
      id: String(tenants.length + 1),
      name: formData.name,
      slug: formData.slug,
      users: 0,
      campaigns: 0,
      status: 'active'
    };
    setTenants([...tenants, newTenant]);
    setShowCreateModal(false);
    setFormData({ name: '', slug: '', displayName: '', primaryColor: '#3B82F6' });
    alert('✅ Tenant created successfully!');
  };

  const handleEdit = (tenant: any) => {
    setSelectedTenant(tenant);
    setFormData({
      name: tenant.name,
      slug: tenant.slug,
      displayName: tenant.name,
      primaryColor: '#3B82F6'
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setTenants(tenants.map(t => 
      t.id === selectedTenant.id 
        ? { ...t, name: formData.name, slug: formData.slug }
        : t
    ));
    setShowEditModal(false);
    alert('✅ Tenant updated successfully!');
  };

  const handleDelete = (tenant: any) => {
    if (confirm(`Are you sure you want to delete ${tenant.name}?`)) {
      setTenants(tenants.filter(t => t.id !== tenant.id));
      alert('✅ Tenant deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenant Management</h1>
          <p className="text-gray-600 mt-2">Manage all tenants in the system</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          + Create Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Tenants</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{tenants.length}</div>
          <div className="text-sm text-green-600 mt-2">All active</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Users</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{tenants.reduce((sum, t) => sum + t.users, 0)}</div>
          <div className="text-sm text-blue-600 mt-2">Across all tenants</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Campaigns</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{tenants.reduce((sum, t) => sum + t.campaigns, 0)}</div>
          <div className="text-sm text-purple-600 mt-2">This month</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Users</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaigns</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                        {tenant.name[0]}
                      </div>
                      <div className="font-semibold text-gray-900">{tenant.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-mono">{tenant.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tenant.users}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tenant.campaigns}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {tenant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button onClick={() => handleEdit(tenant)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => { setSelectedTenant(tenant); setShowSettingsModal(true); }} className="text-gray-600 hover:text-gray-800">Settings</button>
                    <button onClick={() => { setSelectedTenant(tenant); setShowViewModal(true); }} className="text-gray-600 hover:text-gray-800">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Tenant">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenant Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Acme Corporation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., acme-corp"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Optional display name"
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Tenant
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Tenant">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenant Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} title="Tenant Settings">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Branding Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Primary Color</label>
                <input type="color" defaultValue="#3B82F6" className="w-full h-10 rounded" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Custom Domain</label>
                <input type="text" placeholder="tenant.yourdomain.com" className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">Danger Zone</h3>
            <button 
              onClick={() => {
                setShowSettingsModal(false);
                handleDelete(selectedTenant);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Tenant
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Tenant Details">
        {selectedTenant && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-semibold text-gray-900">{selectedTenant.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Slug</div>
                <div className="font-mono text-gray-900">{selectedTenant.slug}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Users</div>
                <div className="font-semibold text-gray-900">{selectedTenant.users}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Campaigns</div>
                <div className="font-semibold text-gray-900">{selectedTenant.campaigns}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {selectedTenant.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
