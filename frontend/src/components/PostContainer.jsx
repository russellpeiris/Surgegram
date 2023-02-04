import React from 'react'
import styled from 'styled-components'
import { Comment, Favorite, FavoriteBorder, Share } from '@mui/icons-material'
import Friend from './Friend'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../state'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 500px;
    /* height: 550px; */
    gap: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
`
const Caption = styled.div`
  font-size: 13px;
  padding: 10px;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Image = styled.img`
  width: 400px;
  /* height: 400px; */
  background-color: #f5f5f5;
`
const ActionBar = styled.div`
  height: 50px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Count = styled.div`
  	font-size: 12px;
`

const PostContainer = ({
  postId,
  postUserId ,
  name ,
  description,
  location ,
  picturePath ,
  userPicturePath,
  likes ,
  comments ,
}) => {
  
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;


  const patchLike = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Container>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Caption>{description}</Caption>
      <ImageContainer>
        {picturePath && (
          <Image src={`http://localhost:5000/assets/${picturePath}`} />
        )}
      </ImageContainer>
      <ActionBar>
        
        <IconContainer onClick={patchLike}>
        {isLiked ? (
                <Favorite sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorder/>
              )}
          <Count>{likeCount}</Count>
        </IconContainer>
        <IconContainer>
          <Comment/>
          <Count>0</Count>
        </IconContainer>
        <IconContainer>
          <Share/>
          <Count>0</Count>
        </IconContainer>

      </ActionBar>
     </Container> 
  )
}

export default PostContainer
