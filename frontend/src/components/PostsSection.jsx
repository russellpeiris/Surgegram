import React, { useState } from 'react'
import styled from 'styled-components'
import PostUpload from './PostUpload'
import { setPosts } from '../state'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostContainer from './PostContainer'
import { Feed, Whatshot } from '@mui/icons-material'



const MainContainer = styled.div`    
    flex: 3;
    gap: 20px;
    padding: 30px 0;
    place-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
const Sorting = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;

`
const Icon = styled.div`
    display: flex;
    align-items: center;
`
const SortButton = styled.button`
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #212121;
        color: white;
    }
`

const Container = styled.div`    
    gap: 20px;
    display: grid;
    grid-template-columns: 1fr;
    padding: 30px 0;
    place-items: center;
`

const PostsSection = ({userId, picturePath, isProfile = false}) => {

    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.posts);
    const token = useSelector((state)=> state.token);

    const getPosts = async () => {
        const response = await fetch("http://localhost:5000/posts",{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    }
    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:5000/posts/${userId}/posts`,{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setPosts({posts: data}));
    }

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    },[]); //eslink-disable-line react-hooks/exhaustive-deps
    

    const [likeSort, setLikeSort] = useState(false);

    const latestPosts = [...posts].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    const popularPosts = [...posts].sort((a, b) => b.likes - a.likes);
    

    const sortedPosts = likeSort ? popularPosts : latestPosts;



  return (
    <MainContainer>
        <Sorting>
            <SortButton onClick={()=>setLikeSort(false)}><Icon><Feed/></Icon>Latest Posts</SortButton>
            <SortButton onClick={()=>setLikeSort(true)}> <Icon><Whatshot/></Icon>Most Liked</SortButton>
        </Sorting>
    <Container>
        <PostUpload picturePath={picturePath}/>

        {sortedPosts.map(
            ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
            })=>(
                <PostContainer 
                    key={_id}
                    postId = {_id}
                    postUserId = {userId}
                    name = {`${firstName} ${lastName}`}
                    description = {description}
                    location = {location}
                    picturePath = {picturePath}
                    userPicturePath = {userPicturePath}
                    likes = {likes}
                    comments = {comments}
                />
            )
        )}
    </Container>
    </MainContainer>
  )
}

export default PostsSection
