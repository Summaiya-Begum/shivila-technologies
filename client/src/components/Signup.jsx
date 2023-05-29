import React, { useState } from 'react';
import axios from 'axios';
import "../styles/signup.css"
import { Link, useNavigate } from "react-router-dom"

const init = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    profilePicture: ""
}
const Signup = () => {
    const [profilePicture, setProfilePicture] = useState("https://science.unimelb.edu.au/__data/assets/image/0007/4130962/person-dummy.jpg");
    const [formData, setFormData] = useState(init)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const postImage = (pic) => {
        console.log(pic, "pic")
        if (pic === undefined) {
            //   toast({
            //     title: "Please Select your Image!",
            //     position: "top",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //   });
            alert("Please Select your Image!")
            return;
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "shreecoder");
            fetch(`https://api.cloudinary.com/v1_1/shreecoder/image/upload`, {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log("url", res.url)
                    setProfilePicture(res.url)
                    setFormData({ ...formData, profilePicture: res.url.toString() });
                    alert("profile added")
                });
        } else {
            //   toast({
            //     title: "Please Select an Image!",
            //     position: "top",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //   });
            alert("profile not added try again")
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://auth-app-api-tgrn.onrender.com/api/register', formData);
            // console.log(formData, 'Signup successful');
            alert('Signup successful')
            navigate("/login")
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };


    return (
        <div className='main-signup-container'>
            <h1>Signup</h1>



            <div className='signup-profile-container'>
                <img src={profilePicture} alt="Selected file" className="preview-image" />
            </div>

            <form onSubmit={handleSignup} >
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    required
                    className='input-container'
                />
                <label htmlFor="gender">Gender:</label>
                <input
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    onChange={(e) => handleChange(e)}
                    required
                    className='input-container'
                />
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    onChange={(e) => handleChange(e)}
                    required
                    className='input-container'
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    required
                    className='input-container'
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    required
                    className='input-container'
                />
                <label htmlFor="profile">Profile Picture:</label>
                <div className="file-input-container">
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        onChange={(e) => postImage(e.target.files[0])}
                        className='input-container'
                    />

                </div>
                <button type="submit">Sign up</button>


                <div className='already-have-account-box'>
                    Already a user? <Link to={"/login"} style={{ color: "#4caf50" }}>Login</Link>
                </div>


            </form>
        </div>
    );
};

export default Signup;
