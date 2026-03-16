"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  Eye,
  MoreVertical,
  Mail,
  Clock,
} from "lucide-react";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Inactive";
  lastLogin: string;
  avatar: string;
}

const usersData: UserItem[] = [
  { id: 1, name: "Site Admin", email: "admin@wristnerd.xyz", role: "Admin", status: "Active", lastLogin: "2026-03-16", avatar: "A" },
  { id: 2, name: "Content Editor", email: "editor@wristnerd.xyz", role: "Editor", status: "Active", lastLogin: "2026-03-15", avatar: "E" },
  { id: 3, name: "SEO Manager", email: "seo@wristnerd.xyz", role: "Editor", status: "Active", lastLogin: "2026-03-14", avatar: "S" },
  { id: 4, name: "Analytics Viewer", email: "analytics@wristnerd.xyz", role: "Viewer", status: "Active", lastLogin: "2026-03-12", avatar: "V" },
  { id: 5, name: "Guest Writer", email: "guest@wristnerd.xyz", role: "Editor", status: "Invited", lastLogin: "—", avatar: "G" },
];

const permissions = [
  { feature: "Content Management", admin: "Full access", editor: "Create & Edit", viewer: "View only" },
  { feature: "Publish Content", admin: "Yes", editor: "Yes", viewer: "No" },
  { feature: "Delete Content", admin: "Yes", editor: "No", viewer: "No" },
  { feature: "Affiliate Links", admin: "Full access", editor: "View & Edit", viewer: "View only" },
  { feature: "Bulk Replace Links", admin: "Yes", editor: "No", viewer: "No" },
  { feature: "Quiz Management", admin: "Full access", editor: "Edit questions", viewer: "View only" },
  { feature: "Analytics", admin: "Full access", editor: "View only", viewer: "View only" },
  { feature: "Export Data", admin: "Yes", editor: "No", viewer: "No" },
  { feature: "User Management", admin: "Full access", editor: "No", viewer: "No" },
  { feature: "Site Settings", admin: "Full access", editor: "No", viewer: "No" },
];

export default function UsersPage() {
  const [deleteConfirm, setDeleteConfirm] = useState<UserItem | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "permissions">("users");

  const roleStyles = {
    Admin: { bg: "bg-navy", text: "text-white", icon: <ShieldCheck className="w-3 h-3" /> },
    Editor: { bg: "bg-gold/10", text: "text-gold-dark", icon: <Edit className="w-3 h-3" /> },
    Viewer: { bg: "bg-gray-100", text: "text-gray-600", icon: <Eye className="w-3 h-3" /> },
  };

  return (
    <div>
      <AdminBreadcrumb items={[{ label: "Users" }]} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy font-heading">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage team members and their permissions</p>
        </div>
        <button
          onClick={() => setEditModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {[
          { id: "users" as const, label: "Team Members", icon: <Shield className="w-4 h-4" /> },
          { id: "permissions" as const, label: "Permissions Matrix", icon: <ShieldCheck className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {usersData.map((user) => {
            const role = roleStyles[user.role];
            return (
              <div key={user.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{user.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenu === user.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                          <button onClick={() => { setEditModal(true); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <div className="border-t border-gray-100 my-1" />
                          <button onClick={() => { setDeleteConfirm(user); setActiveMenu(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${role.bg} ${role.text}`}>
                    {role.icon}
                    {user.role}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      user.status === "Active" ? "bg-emerald-500" :
                      user.status === "Invited" ? "bg-amber-500" : "bg-gray-300"
                    }`} />
                    <span className="text-xs text-gray-500">{user.status}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  Last login: {user.lastLogin}
                </div>
              </div>
            );
          })}

          {/* Add user card */}
          <button
            onClick={() => setEditModal(true)}
            className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gold hover:border-gold/30 transition-colors min-h-[180px]"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Invite Team Member</span>
          </button>
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === "permissions" && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Feature</th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy text-white">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 text-gold-dark">
                      <Edit className="w-3 h-3" /> Editor
                    </span>
                  </th>
                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                      <Eye className="w-3 h-3" /> Viewer
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {permissions.map((perm) => (
                  <tr key={perm.feature} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{perm.feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs font-medium ${perm.admin === "Yes" || perm.admin === "Full access" ? "text-emerald-600" : "text-gray-400"}`}>
                        {perm.admin}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs font-medium ${
                        perm.editor === "No" ? "text-red-400" :
                        perm.editor === "Yes" ? "text-emerald-600" : "text-gold-dark"
                      }`}>
                        {perm.editor}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-xs font-medium ${
                        perm.viewer === "No" ? "text-red-400" :
                        perm.viewer.includes("View") ? "text-gray-500" : "text-emerald-600"
                      }`}>
                        {perm.viewer}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit/Invite Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Invite User" size="md"
        footer={<>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
          <button onClick={() => setEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gold-dark to-gold rounded-lg hover:shadow-lg transition-all">Send Invite</button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <input type="email" placeholder="john@wristnerd.xyz" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <div className="space-y-2">
              {[
                { role: "Admin", desc: "Full access to all features, settings, and user management" },
                { role: "Editor", desc: "Create and edit content, manage affiliate links, view analytics" },
                { role: "Viewer", desc: "View-only access to content and analytics" },
              ].map((item) => (
                <label key={item.role} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="role" className="mt-0.5 accent-gold" defaultChecked={item.role === "Editor"} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} onConfirm={() => setDeleteConfirm(null)}
        title="Remove User" message={`Are you sure you want to remove "${deleteConfirm?.name}"? They will lose access to the admin dashboard.`} confirmLabel="Remove" variant="danger" />
    </div>
  );
}
