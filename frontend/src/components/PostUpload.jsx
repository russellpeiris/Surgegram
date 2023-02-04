import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import UserImage from './UserImage';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts} from '../state';
import { Attachment, DeleteOutlined, Edit, ImageOutlined, ImageSearch, Mic, VideoCameraBack } from '@mui/icons-material';
// import { IconButton } from '@mui/material';


const Container = styled.div`
  width: 500px;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
    
`
const Top = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`
const Avatar = styled.div`
  flex: 2;
`
const Input = styled.input`
  flex: 8;
  height: 50px;
  border: none;
  outline: none;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding-left: 20px;
`
const Middle = styled.div``
const Box = styled.div`
  border-radius: 10px;
  padding: 30px;
  outline: none;
  border: none;
  background-color: #f5f5f5;
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #75757D;
  &:hover{
    color: #212121;
  }
`
const Bottom = styled.div`
  place-items: center;
  display: flex;
  gap: 5px;
  justify-content: space-evenly;
`
const Option = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  border-radius: 10px;
  cursor: pointer;
  &:hover{
    background-color: #f5f5f5;
  }
`
const Text = styled.p`
  font-size: 12px;
  margin: 0;
`
const Button = styled.button`
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 8px;
  background-color: FAFAFA;
  cursor: pointer;
  &:hover{
    background-color: #212121;
    color: white;
    /* transition: all ease 0.3s; */
  }
`
const ImageName = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
`
const IconButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    

`
const PostUpload = ({picturePath}) => {
  // console.log(picturePath);
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:5000/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (


    <Container>
      <Top>
        
        <Avatar>
          <UserImage image={picturePath}/>
        </Avatar>
        <Input 
          placeholder='What is in your mind?'
          onChange={(e)=>setPost(e.target.value)}
          value={post}  
        />

      </Top>

      <Middle>
        {isImage &&(
        <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
            {({ getRootProps, getInputProps }) => (

                <Box {...getRootProps()}>

                    <input {...getInputProps()} />

                    {!image ? ( <Text><ImageSearch/></Text> 
                    ) : (
                        <ImageName>{image.name}<Edit/></ImageName>
                    )}
                  
                </Box>
               
               
               )}
        </Dropzone>
        )}

               {image && (
                 <IconButton
                   onClick={() => setImage(null)}
                 >
                   <DeleteOutlined />
                 </IconButton>
               )}
      </Middle>

      <Bottom>
        <Option onClick={() => setIsImage(!isImage)}>
          <ImageOutlined/><Text>Image</Text>
        </Option>
        <Option>
          <VideoCameraBack/><Text>Clip</Text>
        </Option>
        {/* <Option>
          <Attachment/><Text>Attachment</Text>
        </Option>
        <Option>
        <Mic/><Text>Audio</Text>
        </Option> */}
      </Bottom>
        <Button
          disabled={!image}
          onClick={handlePost}
          
        >
          Post
        </Button>
    </Container>
  )
}

export default PostUpload
