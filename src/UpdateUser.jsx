import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function UpdateUser() {
  const {id} = useParams()
  const [photoURL, setPhotoURL] = useState()
  const [name, setName] = useState()
  const [title, setTitle] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("https://crud-backend-1usd.onrender.com/getUser/"+id)
    .then((result)=>{
        setPhotoURL(result.data.photoURL)
        setName(result.data.name)
        setTitle(result.data.title)
        setPhone(result.data.phone)
        setEmail(result.data.email)
    })
    .catch((err)=>{
        console.log(err);
    })
  },[id])

  const handleFileSelect = (event) => {
    // console.log(event.target.files[0]);
    const selectedFile = event.target.files[0];
    setPhotoURL(selectedFile); // Update the state with the selected file
  };


  const Update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photoURL);
    formData.append('name', name);
    formData.append('title', title);
    formData.append('phone', phone);
    formData.append('email', email);
    axios.put(`https://crud-backend-1usd.onrender.com/updateUser/${id}`, formData)
    .then((result)=>{
      console.log(result)
      navigate('/');
    })
    .catch((err)=>{console.log(err)})

  };

  const handleCancel = ()=>{
    navigate('/');
  }

  return (
    <>
    <div class="addEmployee" id="addEmployee">
    <h2>Update Employee</h2>

    <div>
      <form onSubmit={Update} encType="multipart/form-data">
        <label for="photo" >Photo of Employee</label>
        <input type="file" id="photo" name="photo" accept="image/*" className='pictureEmp'
        onChange={handleFileSelect}/>

        <label for="name">Name</label>
        <input type="text" value={name} id="name"  name="name" required
        onChange={(e)=> setName(e.target.value)}/>

        <label for="title">Title</label>
        <input type="text" value={title} id="title" name="title" required
        onChange={(e)=> setTitle(e.target.value)}/>

        <label for="phone">Phone</label>
        <input type="text" value={phone} id="phone" name="phone" required
        onChange={(e)=> setPhone(e.target.value)}/>

        <label for="email">Email</label>
        <input type="text" value={email} id="email" name="email" required
        onChange={(e)=> setEmail(e.target.value)}/>

        <div class="add-button" id="add-button">
          <button type="submit" class="btn-resister">Update</button>
          <button class="btn-resister-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
    </>
  )
}