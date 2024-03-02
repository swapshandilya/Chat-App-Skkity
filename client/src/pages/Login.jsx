import React , {useCallback, useState, useEffect} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify" ;
import "react-toastify/dist/ReactToastify.css";
import axios  from "axios";
import {loginRoute} from '../utils/APIRoutes';


export default function Login() {


  const navigate = useNavigate();
    const [values , setValues] = useState({
        username : "",
        password : "",
    })

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover : true,
        theme: "dark"
    };

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/Chat')
      }
    },[])

    const handleValidation =()=>{
        const {password, confirmPassword, username, email}=values;
        if(password===""){
            toast.error("Password is required." , toastOptions) ;
            return false;
        }
        else if(username.length===""){
            toast.error("Username is required" , toastOptions) ;
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
            
            const {password, username}=values;
            const { data }   = await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status===false){
              toast.error(data.msg, toastOptions);
            }
            if(data.status===true){
              localStorage.setItem('chat-app-user', JSON.stringify(data.user));
              navigate("/chat");
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
                min="3"
            />
          
            <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={(e)=>handlechange(e)}
            />
          

            <button type="submit" >Login</button>
            <span>Don't have an account ? <Link to="/register">Register</Link></span>

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
