import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import NavBar from '../components/NavBar'
import PostsSection from '../components/PostsSection'
import ProfileBar from '../components/ProfileBar'

const Container = styled.div`
    display: flex;
    background-color: #ffffff; 
    justify-content: center;
    height: 100vh;
`

const Home = () => {

  const {_id, picturePath} = useSelector((state)=> state.user);
  return (
    <Container>
        <NavBar/>
        <PostsSection/>
        <ProfileBar userId={_id} picturePath={picturePath}/>
    </Container>
  )
}

export default Home