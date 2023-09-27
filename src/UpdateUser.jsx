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
    axios.get("http://localhost:3001/getUser/"+id)
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

  const handleFileSelect =(event)=> {
    const selectedFile = event.target.files[0]; // Get the first selected file
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPhotoURL(fileURL);
    }
  }

  const Update = (e)=>{
    e.preventDefault();
    axios.put(`http://localhost:3001/updateUser/${id}`, {photoURL,name,title,phone,email})
    .then((result)=>{
      console.log(result)
      navigate('/');
    })
    .catch((err)=>{console.log(err)})
  }

  return (
    <>
    <div class="addEmployee" id="addEmployee">
    <h2>Update Employee</h2>

    <div>
      <form onSubmit={Update}>
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
          <button class="btn-resister-cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
    </>
  )
}