import React, { useState } from "react";
import axios from "axios";
import "../styles/editprofilemodal.css";

function EditProfileModal({ isOpen, onClose, user, getCurrentUser, setUser }) {
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const postImage = (pic) => {
    console.log(pic, "pic");
    if (pic === undefined) {
      //   toast({
      //     title: "Please Select your Image!",
      //     position: "top",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      alert("Please Select your Image!");
      return;
    }

    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app"); //from cloudainary
      data.append("cloud_name", "shreecoder");
      fetch(`https://api.cloudinary.com/v1_1/shreecoder/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("url", res.url);
          setProfilePicture(res.url.toString());
          alert("profile added");
        });

    } else {
      //   toast({
      //     title: "Please Select an Image!",
      //     position: "top",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      alert("profile not added try again");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { token, userId } = JSON.parse(localStorage.getItem("user"));

    const profileData = {
      name,
      gender,
      phoneNumber,
      email,
      profilePicture,
      userId,
    };


    console.log(profileData, 'profileData');
    try {
      const response = await axios.patch(
        "https://auth-app-api-tgrn.onrender.com/profile/update",
        profileData,
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data, 'dojvvfv');
      alert("Profile updated successfully");
      onClose();
      setUser(profileData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  console.log(user, 'ue');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Profile</h2>
        <div className="update-profile-container">
          <img
            src={profilePicture}
            alt="Profile Preview"
            className="preview-image"
          />
        </div>
        <form onSubmit={handleUpdateProfile}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input type="file" onChange={(e) => postImage(e.target.files?.[0])} />
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
