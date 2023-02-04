import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, People, Place, Visibility, Work } from '@mui/icons-material';

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
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
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
const Bio = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
`
const Details = styled.div`
    width: 200px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px;
    font-size: 14px;
    justify-content: space-evenly;
    
`
const Detail = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;

`

const DetailValue = styled.div`

`
const DetailIcon = styled.div`

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
        occupation,
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
        {/* <FriendList userId={userId}/> */}
        <Bio>
        <Details>
            <Detail>
                <DetailIcon><Work/></DetailIcon>
                {/* <DetailTitle>Lives in</DetailTitle> */}
                <DetailValue>{occupation}</DetailValue>
            </Detail>
            <Detail>
                <DetailIcon><Place/></DetailIcon>
                <DetailValue>{location}</DetailValue>
            </Detail>
            <Detail>
                <DetailIcon><Visibility/></DetailIcon>
                <DetailValue>{viewedProfile} Profile Views</DetailValue>
            </Detail>
            <Detail>
                <DetailIcon><BarChart/></DetailIcon>
                <DetailValue>{impressions} Impressions</DetailValue>
            </Detail>
            <Detail>
                <DetailIcon><People/></DetailIcon>
                <DetailValue>{friends.length} Friends</DetailValue>

            </Detail>
        </Details>
        </Bio>
    </Container>
  )
}

export default ProfileBar
