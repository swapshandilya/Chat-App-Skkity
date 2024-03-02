import React from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import LogOut from './LogOut';

export default function Welcome({currentUser}) {

  const data = JSON.parse(localStorage.getItem("chat-app-user"))
  return (
    <Container>
        <LogOut/>
        <img src={Robot} alt="robot"/>
        <h1>Welcome, <span>{data.username}!</span></h1>
        <h3>Please select a chat !</h3>
    </Container>
  )
}

const Container = styled.div`

display: flex;
justify-content : center;
align-items : center;
flex-direction: column;
color : white;
img{
    height : 20rem;
}
span{
    color : #4e0eff;
}

`;