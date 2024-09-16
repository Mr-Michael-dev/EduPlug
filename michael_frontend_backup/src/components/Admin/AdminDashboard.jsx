import React from 'react';
import PostManagement from './PostManagement';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <PostManagement />
      {/* Add user management */}
    </div>
  );
}

export default AdminDashboard;
