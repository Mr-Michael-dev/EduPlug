import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import NotificationModal from '../notifications/NotificationModal'; // import your modal component
import { useAuth } from './AuthContext'; // assuming you're using AuthContext

const Logout = () => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    logout(); // Call the logout function from AuthContext
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavDropdown.Item onClick={handleLogout}>
        Logout
      </NavDropdown.Item>

      {/* Use the NotificationModal for logout confirmation */}
      <NotificationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmLogout}
        title="Confirm Logout"
        body="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Logout;
