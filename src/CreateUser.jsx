import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [photoURL, setPhotoURL] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  // const Submit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(); // Create a new FormData object
  //   formData.append('photo', selectedFile); // Use 'photo' as the field name
  //   formData.append('name', name);
  //   formData.append('title', title);
  //   formData.append('phone', phone);
  //   formData.append('email', email);
    
  //   axios
  //     .post("http://localhost:3001/createUser",formData)
  //     .then((result) => {
  //       console.log(result);
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const Submit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Get the file input element
    const fileInput = document.getElementById('photo');
  
    // Check if a file is selected
    if (fileInput && fileInput.files.length > 0) {
      // Get the selected file
      const selectedFile = fileInput.files[0];
  
      // Append the selected file to formData
      formData.append('photo', selectedFile);
    }
  
    formData.append('name', name);
    formData.append('title', title);
    formData.append('phone', phone);
    formData.append('email', email);
  
    axios
      .post("https://crud-backend-1usd.onrender.com/createUser", formData)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      // Revoke the previous URL (if any)
      if (photoURL) {
        URL.revokeObjectURL(photoURL);
      }
      const fileURL = URL.createObjectURL(selectedFile);
      setPhotoURL(fileURL);
    }
  };

  const handleCancel = () =>{
    navigate('/');
  }

  return (
    <>
      <div class="addEmployee" id="addEmployee">
        <h2>Add Employee</h2>

        <div>
          <form onSubmit={Submit} encType="multipart/form-data">
            <label for="photo">Photo of Employee</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="pictureEmp"
              required
              onChange={handleFileSelect}
            />

            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            <label for="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter Phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />

            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <div class="add-button" id="add-button">
              <button type="submit" class="btn-resister">
                Add
              </button>
              <button class="btn-resister-cancel" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
