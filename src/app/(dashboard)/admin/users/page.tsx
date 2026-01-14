'use client';

import { useState } from 'react';
import Modal from '@/components/modals/modal';

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: '1', name: 'System Admin', email: 'admin@adgen.local', role: 'SystemAdmin', status: 'active', lastActive: '2 hours ago' },
    { id: '2', name: 'John Marketer', email: 'john@demo.local', role: 'Marketer', status: 'active', lastActive: '5 hours ago' },
    { id: '3', name: 'Jane Viewer', email: 'jane@demo.local', role: 'Viewer', status: 'active', lastActive: '1 day ago' },
    { id: '4', name: 'Bob TenantAdmin', email: 'bob@demo.local', role: 'TenantAdmin', status: 'active', lastActive: '3 hours ago' },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer'
  });

  const handleInvite = () => {
    const newUser = {
      id: String(users.length + 1),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: 'active',
      lastActive: 'Just now'
    };
    setUsers([...users, newUser]);
    setShowInviteModal(false);
    setFormData({ name: '', email: '', role: 'Viewer' });
    alert('✅ User invited successfully!');
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, name: formData.name, email: formData.email, role: formData.role }
        : u
    ));
    setShowEditModal(false);
    alert('✅ User updated successfully!');
  };

  const handleRemove = (user: any) => {
    if (confirm(`Are you sure you want to remove ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
      alert('✅ User removed successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage users and their roles</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          + Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Total Users</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{users.length}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Active Now</div>
          <div className="text-3xl font-bold text-green-600 mt-2">2</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Admins</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {users.filter(u => u.role.includes('Admin')).length}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-600">Marketers</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">
            {users.filter(u => u.role === 'Marketer').length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {user.name[0]}
                      </div>
                      <div className="font-semibold text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'SystemAdmin' ? 'bg-red-100 text-red-800' :
                      user.role === 'TenantAdmin' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'Marketer' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleRemove(user)} className="text-red-600 hover:text-red-800">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Invite New User">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Viewer">Viewer</option>
              <option value="Marketer">Marketer</option>
              <option value="TenantAdmin">Tenant Admin</option>
              <option value="SystemAdmin">System Admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowInviteModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit User">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Viewer">Viewer</option>
              <option value="Marketer">Marketer</option>
              <option value="TenantAdmin">Tenant Admin</option>
              <option value="SystemAdmin">System Admin</option>
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
