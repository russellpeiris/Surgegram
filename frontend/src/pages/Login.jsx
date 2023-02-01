import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    /* margin: 0; */
    height: 100vh;
`
const LeftContainer = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#061826;

`
const LoginContainer = styled.div`
    background-color: white;
    height: 400px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const LoginTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
`
const Fields = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
`
const Input = styled.input`
    height: 38px;
    width: 300px;
    outline: none;
    border: none;
    background-color: #f5f5f5;
    padding-left: 10px;
    
`
const PrimButton = styled.button`
    height: 38px;
    cursor: pointer;
    border: none;
    background-color: #061826;
    color: white;

    &:hover{
        background-color: #0e273a;
        font-weight: 500;
    }

`
const SecButton = styled.button`
    height: 38px;
    cursor: pointer;
    border: none;
    background-color: #ccddea;

    &:hover{
        background-color: #b2d0e7;
        font-weight: 500;
    }
`

const RightContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
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
            <LoginContainer>
                <LoginTitle>
                    LOGIN / SIGNUP
                </LoginTitle>
                <Fields>
                    <Input placeholder='Email' type='text'/>
                    <Input placeholder='Password' type='password'/>
                    <PrimButton>Login</PrimButton>
                    <SecButton>Register</SecButton>
                </Fields>
            </LoginContainer>
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