import React, { useState, useEffect } from "react";
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

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", {
        photoURL,
        name,
        title,
        phone,
        email,
      })
      .then((result) => {
        console.log(result);
        setPhotoURL(null);
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

  return (
    <>
      <div class="addEmployee" id="addEmployee">
        <h2>Add Employee</h2>

        <div>
          <form onSubmit={Submit}>
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
              <button class="btn-resister-cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
