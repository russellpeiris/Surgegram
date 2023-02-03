import React from 'react'
import styled from 'styled-components'
import PostUpload from './PostUpload'

const Container = styled.div`    
    flex: 3;
    gap: 20px;
    display: grid;
    grid-template-columns: 1fr;
    background-color: aliceblue;
    padding: 30px 0;
    place-items: center;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
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

const PostsSection = () => {
  return (
    <Container>
        <PostUpload/>
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
    </Container>
  )
}

export default PostsSection
