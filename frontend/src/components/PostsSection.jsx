import React  from 'react'
import styled from 'styled-components'
import PostUpload from './PostUpload'
import { setPosts } from '../state'
import PostSection from './PostContainer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostContainer from './PostContainer'

const Container = styled.div`    
    flex: 3;
    gap: 20px;
    display: grid;
    grid-template-columns: 1fr;
    padding: 30px 0;
    place-items: center;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`
// const PostContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     background-color: #f1f12d;
//     width: 500px;
//     height: 550px;
// `
const Post = styled.div`
    height: 500px;
    background-color: #265b90;
`
const Desc = styled.div`
    height: 50px;
    background-color: #262627;
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
    

  return (
    <Container>
        <PostUpload picturePath={picturePath}/>

        {posts.map(
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
  )
}

export default PostsSection
