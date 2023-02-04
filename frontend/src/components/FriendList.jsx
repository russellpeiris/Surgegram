// import React from 'react'
// import Friend from './Friend'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setFriends } from '../state'
// import styled from 'styled-components'

// const Container = styled.div`

// `
// const Friends = styled.div`

// `

// const FriendList = (userId) => {

//     const dispatch = useDispatch();
//     const friends = useSelector(state => state.friends);
//     const token = useSelector(state => state.token);

//     const getFriends = async ()=>{
//         const response = await fetch(`http://localhost:5000/users/${userId}/friends`, 
//         {
//             method: 'GET',
//             headers: {Authorization: `Bearer ${token}`}
//         });
//         const data = await response.json();
//         dispatch(setFriends({friends: data}));
//     };

//     useEffect(()=>{
//         getFriends();
//     }, []); //eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <Container>
//         <p>Friend List</p>
//         {/* <Friends>
//         {friends && friends.map((friend) => {
//             return (
//                 <Friend 
//                 key={friend._id}
//                 friendId={friend._id}
//                 name={`${friend.firstName} ${friend.lastName}`}
//                 subtitle={friend.occupation}
//                 userPicturePath={friend.picturePath}
//                 />
//             )
//             })}
//         </Friends> */}
//     </Container>
//   )
// }

// export default FriendList
