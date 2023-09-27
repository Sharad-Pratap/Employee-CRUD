import React, { useState, useEffect } from "react";
import "./styles.css";
import $ from "jquery"; // Import jQuery
import "bigslide"; // Import the bigSlide plugin
import { Link } from "react-router-dom";
import axios from "axios";
export default function Users() {
  useEffect(() => {
    // Initialize bigSlide() when the component is mounted
    $(".menu-link").bigSlide();
  }, []); // The empty dependency array ensures this code runs only once after the initial render

  
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3001")
    .then((result)=>{
        setUsers(result.data);
    })
    .catch((err)=>{
        console.log(err);
    })
  })

  const handleDelete = (id) =>{
    axios.delete('http://localhost:3001/deleteUser/'+id)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

  }
  return (
    <>
      <header>
        <div class="top" id="top">
          <div class="logo">
            <p>CRUDify</p>
          </div>

          <nav class="menu">
            <ul>
              <li>
                <a href="#mybooks">My List</a>
              </li>
              <li>
                <a href="#mybooks">Something</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
          <div class="profile">
            <figure>
              <img src="assets/profile.jpeg" alt="profile" />
            </figure>
            <div>
              <p>
                <a href="#">Sharad</a>
              </p>
              <p>
                <a href="#">Pratap</a>
              </p>
            </div>
          </div>

          <div class="menu-hamburguer">
            <a href="#menu" class="menu-link">
              &equiv;
            </a>
            <nav id="menu" class="panel" role="navigation">
              <ul>
                <li>
                  <figure>
                    <img src="assets/profile.jpeg" alt="loading.." />
                  </figure>
                  <p>Sharad Pratap</p>
                </li>

                <li>
                  <a href="#mybooks">My List</a>
                </li>
                <li>
                  <a href="#myreservations">Something</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#">Exit</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      
      
      <Link to='/create' className="main-top" >
        <button>
          <a href="#resisterbook">
            <span
              style={{
                fontSize: "2rem",
                fontFamily: "sans-serif",
                textDecoration: "None",
                fontWeight: "normal",
              }}
            >
              +
            </span>
            Add Employee
          </a>
        </button>
        
        </Link>
      
      
      <main>
      <section class="mylist" id="mylist">
  {users.map((user, index) => (
    <div class="card" key={index}>
      <div>
        <label class="id">{index + 1}</label>
        <img src={user.photoURL}  alt="Employee" />
        
      </div>

      <div>
        <label for="title">Name</label>
        <p name="title">{user.name}</p>
      </div>

      <div>
        <label for="status">Title</label>
        <p name="status">{user.title}</p>
      </div>

      <div>
        <label for="status">Phone</label>
        <p name="status">{user.phone}</p>
      </div>

      <div>
        <label for="status">Email</label>
        <p name="status">{user.email}</p>
      </div>

      <div class="div-button">
        <button>
          <figure>
            <img src="assets/icons8-delete.svg" alt="delete" onClick={(e)=>handleDelete(user._id)} />
          </figure>
        </button>
        <Link to={`/update/${user._id}`}>
        <button>
          <figure>
          <img src="assets/icons8-edit.svg" alt="edit"/>
          </figure>
        </button> 
        </Link>
      </div>
    </div>
  ))}
</section>

      </main>
      <footer>
        <div class="contact" id="contact">
            <p>Contact us</p>

            <div class="social-media">
                
                <a href="#"><img src="assets/icons8-linked-in.svg" alt="linkedin"/></a>
                <a href="#"><img src="assets/icons8-facebook.svg" alt="linkedin"/></a>
                <a href="#"><img src="assets/icons8-twitter.svg" alt="linkedin"/></a>
               
            </div>
        </div>
    </footer>
    </>
  );
}
