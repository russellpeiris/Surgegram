import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setmode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin:(state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        //the action object is used to represent a change or an 
        // update to the state, and the payload property is used
        // to contain data that is relevant to the change or update. 
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        setFriends:(state, action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("User does not have friends")
            }
        },
        //updates posts
        setPosts:(state, action)=>{
            state.posts = action.payload.posts;
        },
        //updates single post
        setPost: (state, action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    },

})

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;