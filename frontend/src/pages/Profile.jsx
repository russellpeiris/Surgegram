import React from 'react'
import styled from 'styled-components'
import NavBar from '../components/NavBar'

const Container = styled.div`
    display: flex;
`
const SubContainer = styled.div`
    flex: 5;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Profile = () => {
  return (
    <>
        <Container>
        <NavBar/>
            <SubContainer>

                This page has not been developed...
            </SubContainer>
        </Container>
    </>
  )
}

export default Profile
