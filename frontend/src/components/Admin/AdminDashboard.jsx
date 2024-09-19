import React from 'react';
import PostManagement from './PostManagement';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Manage posts and users here.</p>
      <PostManagement />
    </div>
  );
}

export default AdminDashboard;

// function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>
//       <PostManagement />
//       {/* Add user management */}
//     </div>
//   );
// }

// export default AdminDashboard;
