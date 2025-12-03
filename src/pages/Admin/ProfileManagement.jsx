import React from 'react';
import AdminHeader from '../../components/AdminHeader';

export default function ProfileManagement() {
  return (
    <div className="min-h-screen bg-[#faf3e0]">
      <AdminHeader />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#6b4f4f]">Profile & Account Management</h1>
        <p className="mt-4 text-gray-700">This page is a placeholder. Implement profile management here.</p>
      </main>
    </div>
  );
}
