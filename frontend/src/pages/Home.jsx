import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    background-color: gray; 
    /* justify-content: center;
     */
    flex-direction: column;
    align-items: center;
`
const Left = styled.div`
    background-color: aliceblue;
    width: 30%;
    height: 100vh;
    left: 0%;
    position: fixed;
    text-align: center;
`
const Middle = styled.div`    
    padding-top: 30px;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
`
const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f1f12d;
    width: 500px;
    height: 550px;
`
const Post = styled.div`
    height: 500px;
    background-color: #265b90;
`
const Desc = styled.div`
    height: 50px;
    background-color: #262627;
`
const Right = styled.div`
    right: 0%;
    position: fixed;
    background-color: aliceblue;
    width: 30%;
    height: 100vh;
`
const Profile = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;

`
const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    background-color: antiquewhite;
    border-radius: 50%;
    margin-top: 70px;

`
const Name = styled.div`
    font-size: 24px;
`
const UName = styled.div`
    font-weight: 300;
`
const Home = () => {
  return (
    <Container>
        <Left>
            <h1>Surgegram</h1>
        </Left>
        <Middle>
            <PostContainer>
                <Post/>
                <Desc/>
            </PostContainer>
            <PostContainer>
                <Post/>
                <Desc/>
            </PostContainer>
            <PostContainer>
                <Post/>
                <Desc/>
            </PostContainer>
        </Middle>
        <Right>
            <Profile>
                <ImageContainer>
                </ImageContainer>
                <Name>
                    Russell Peiris
                </Name>
                <UName>
                    ardpeiris
                </UName>
            </Profile>
        </Right>
    </Container>
  )
}

export default Home