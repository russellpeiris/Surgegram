import React from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import UserImage from './UserImage'
import { setFriends } from '../state'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid #e0e0e0;
    justify-content: space-between;
    padding: 4px 10px;
`
const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    cursor: pointer;
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    padding: 5px;
`
const IconContainer = styled.button `
    background-color: transparent;
    border: none;
    cursor: not-allowed;
    margin-right: 5px;
`

const Friend = ({friendId, name, subtitle, userPicturePath}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state)=> state.token);
    const {_id} = useSelector((state)=> state.user);
    const friends = useSelector((state)=> state.user.friends);

    // Object.values(friends)
    const isFriend = friends.find((friend)=>friend._id === friendId);
    
    const patchFriend = async ()=> {
        const response = await fetch(`http://localhost:5000/users/${_id}/${friendId}`,{
            method: "PATCH",
            headers: {Authorization: `Bearer ${token}`,
            "Content-Type": 'application/json'
            }
        });
        const data = await response.json();
        dispatch(setFriends({friends: data}));
    };

  return (

    <Container key={friendId}>
        <ImageContainer>
        <UserImage image={userPicturePath} size = "55px"/>
            <Box 
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                    navigate(0);
                }}
            >
                {name}<br/>
                {subtitle}
                {/* Friend Name <br/>
                Friend Desc */}

            </Box>
        </ImageContainer>
        <IconContainer
            disabled 
            onClick={()=> patchFriend()}
             >
        {
            isFriend ? (
                <PersonRemoveOutlined />
            ) : (
                <PersonAddOutlined />
            )
        }
        </IconContainer>
    </Container>
  )
}

export default Friend
