import React , {useCallback, useState, useEffect} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify" ;
import "react-toastify/dist/ReactToastify.css";
import axios  from "axios";
import {registerRoute} from '../utils/APIRoutes';


export default function Register() {


  const navigate = useNavigate();
    const [values , setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword: "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover : true,
        theme: "dark"
    };

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/')
      }
    },[])

    const handleValidation =()=>{
        const {password, confirmPassword, username, email}=values;
        if(password!==confirmPassword){
            toast.error("password and confirm password should be same." , toastOptions) ;
            return false;
        }
        else if(password.length<8){
            toast.error("password should be atleast 8 characters." , toastOptions) ;
            return false;
        }
        else if(username.length<3){
            toast.error("username should be atleast 3 characters." , toastOptions) ;
            return false;
        }
        else if(email===""){
            toast.error("email is required." , toastOptions) ;
            return false;
        }
        return true;
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            
            const {password, username, email}=values;
            const { data }   = await axios.post(registerRoute,{
                username,
                email,
                password,
            });
            if(data.status===false){
              toast.error(data.msg, toastOptions);
            }
            if(data.status===true){
              localStorage.setItem('chat-app-user', JSON.stringify(data.user));
              navigate("/setAvatar");
            }
        }
    }

    const handlechange=(event)=>{
      setValues({...values , [event.target.name]:event.target.value});
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>

            <div className="brand">
                <img src={logo} alt="logo"/>
                {/* <h1>Skkity</h1> */}
            </div>
            <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                onChange={(e)=>handlechange(e)}
            />
            <input 
                type="email" 
                placeholder="email" 
                name="email" 
                onChange={(e)=>handlechange(e)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={(e)=>handlechange(e)}
            />
            <input 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword" 
                onChange={(e)=>handlechange(e)}
            />

            <button type="submit" >Create User</button>
            <span>already have an account ? <Link to="/login">Login</Link></span>

            </form>
        </FormContainer>
        <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  align-content : center;
  img {
    height: 10rem;
    width: 10rem;
    border-radius : 20%;
  }
  
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;
