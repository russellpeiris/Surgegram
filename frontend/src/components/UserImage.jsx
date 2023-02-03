import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 60px;
    height: 60px;
`
const Image = styled.img`
    object-fit: cover;
    border-radius: 50%;
    width: 60px;
    height: 60px;
`
const UserImage = ({image, size='60px'}) => {
  return (
    <Container>
        <Image 
            alt="user"
            src={`http://localhost:5000/assets/${image}`}
        />
    </Container>
  )
}

export default UserImage
