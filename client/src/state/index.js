import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  token_type: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token_type = action.payload.token_type;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) state.user.friends = action.payload.friends;
      else console.log("User Friends donot exist");
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const customizedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = customizedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPost, setPosts } =
  authSlice.actions;
export default authSlice.reducer;
