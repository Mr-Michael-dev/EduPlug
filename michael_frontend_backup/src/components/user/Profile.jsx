import React, { useState } from 'react';

function Profile() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
    // API call to upload image
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div>
        <label>Profile Picture:</label>
        <input type="file" onChange={handleImageUpload} />
      </div>
      {profileImage && <img src={profileImage} alt="Profile" />}
      {/* Other profile info */}
    </div>
  );
}

export default Profile;
