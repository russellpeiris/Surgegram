import React from 'react'
import styled from 'styled-components'
import {PowerSettingsNew, Home, Search, Person, Chat} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../state';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
    /* background-color: aliceblue; */
    /* width: 30%; */
    height: 100vh;
    flex: 1;
    /* Container: 0%; */
    /* position: fixed; */
    cursor: pointer;
    text-align: center;
    border-right: 1px solid #e0e0e0;
`
const Title = styled.h1`
    cursor: pointer;
    text-align: left;
    margin-left: 30px;

`
const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 30px;
    text-align: left;

`
const MenuItem = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 30px;
    &:hover{
        background-color: #f5f5f5;
    }
`
const Icon = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
`
const Logout = styled.div`
    /* position: fixed; */
    /* bottom: 30px; */
    background-color: aqua;
    height: 50px;
    display: flex;
    align-items: center;

`
const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);
    // const isNotMobileView = useMediaQuery("(min-width:1000px)");
    // const theme = useTheme();
    // const neutralLight = theme.palette.neutral.light;
    // const dark = theme.palette.neutral.dark;
    // const background = theme.palette.background.default;
    // const alt = theme.palette.background.alt;
    // const primaryLight = theme.palette.primary.light;

  return (

    <Container>
      <Title onClick={()=> navigate("/home")}>Surgegram</Title>
    <Menu>
        <MenuItem>
            <Icon><Search/></Icon>Search
        </MenuItem>
        <MenuItem onClick={()=> navigate("/home")}>
            <Icon><Home/></Icon>Home
        </MenuItem>
        <MenuItem>
            <Icon><Person/></Icon>My Profile
        </MenuItem>
        <MenuItem>
            <Icon><Chat/></Icon>Messages
        </MenuItem>
        <MenuItem onClick={()=>dispatch(setLogout())}>
            <Icon><PowerSettingsNew/></Icon>Logout
        </MenuItem>
    </Menu>
    </Container>
    
  )
}

export default NavBar
