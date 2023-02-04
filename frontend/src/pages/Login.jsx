import React from 'react'
import styled from 'styled-components'
import LoginForm from '../components/LoginForm'

const Container = styled.div`
    display: flex;
    height: 100vh;
`
const LeftContainer = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#0F072C;
    background-image: url(https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
    background-position: center;
    
`
const RightContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    /* background-color: #ffffff; */
    /* justify-content: center;
    align-items: center; */
`
const Up = styled.div`
    flex: 1;
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const Bottom = styled.div`
    padding-left: 50px;
    flex: 1;
`
const Title = styled.div`
    font-size: 28px;
`
const Detail = styled.div`
    font-size: 28px;
    font-weight: 300;
`
const MyName = styled.div`
    font-size: 28px;

`

const Login = () => {
  return (
    <Container>
        <LeftContainer>
            <LoginForm/>
        </LeftContainer>
        <RightContainer>
            <Up>
                <Title>
                    Surge SE Internship
                </Title>
                <Detail>
                    March 2023
                </Detail>
            </Up>
            <Bottom>
            <MyName>
                Russell Peiris
            </MyName>
            </Bottom>
        </RightContainer>
    </Container>
  )
}

export default Login