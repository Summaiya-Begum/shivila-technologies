import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import EditProfileModal from './EditProfileModal';
import axios from 'axios';
import editIcon from "../assets/svg/pen.svg"
import { useNavigate } from 'react-router-dom';

const init = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    profilePicture: ""
}

function Profile() {
    const [user, setUser] = useState(init)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    if (!token) {
        navigate('login')
    }



    const getCurrentUser = () => {
        axios
            .get(`https://auth-app-api-tgrn.onrender.com/profile/${token.userId}`)
            .then((response) => {
                setUser(response.data.user);
                console.log(response.data.user, 'res');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCurrentUser();
    }, []);


    return (
        <div className="profile-container">
            <div className="edit-modal">
                <h2 style={{ marginLeft: "40px" }}>Welcome<span style={{ marginLeft: "10px", fontWeight: "200", fontFamily: "monospace" }}>{user.name}</span></h2>
                <button onClick={openModal}><img src={editIcon} alt="editIcon" /></button>
                {isModalOpen && (
                    <EditProfileModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        user={user}
                        setUser={setUser}
                        getCurrentUser={getCurrentUser}
                    />
                )}
            </div>


            <div className="profile-info">
                <div className="profile-picture">
                    <img src={user.profilePicture ? user.profilePicture : "https://science.unimelb.edu.au/__data/assets/image/0007/4130962/person-dummy.jpg"} alt="Profile" />
                </div>
                <div className="profile-details">
                    <p>
                        <span className="profile-label">Name:</span> {user.name}
                    </p>
                    <p>
                        <span className="profile-label">Gender:</span> {user.gender}
                    </p>
                    <p>
                        <span className="profile-label">Phone Number:</span>{' '}
                        {user.phoneNumber}
                    </p>
                    <p>
                        <span className="profile-label">Email:</span> {user.email}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
