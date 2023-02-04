import React, { useState } from 'react';
import styled from 'styled-components';
import {ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined} from '@mui/icons-material';
import UserImage from './UserImage';
import { useSelector } from 'react-redux';
import { useEffect, useS } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    /* Container: 0%;
    position: fixed; */
    /* background-color: aliceblue; */
    /* width: 30%; */
    height: 100vh;
    flex: 2;
    border-left: 1px solid #e0e0e0;
`
const Profile = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    

`
const ProfilePic = styled.img`
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 50%;
    

`
const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    background-color: #f5f5f5;
    border-radius: 50%;
    margin-top: 70px;

`
const Name = styled.div`
    font-size: 24px;
`

const ProfileBar = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:5000/users/${userId}`,
            {
                method : "GET",
                headers : {Authorization: `Bearer ${token}`},
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(()=>{
        getUser(); 
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    if(!user){
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        viewedProfile,
        impressions,
        friends,
    } = user;

  return (

    <Container>
        <Profile>
            <ImageContainer >
                {/* <UserImage image={picturePath}/> */}
                <ProfilePic
                    alt="user"
                    src={`http://localhost:5000/assets/${picturePath}`}
                />
            </ImageContainer>
            <Name onClick={()=> navigate(`/profile/${userId}`)}>
                {firstName} {lastName}
            </Name>
        </Profile>
    </Container>
  )
}

export default ProfileBar
