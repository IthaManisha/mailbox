import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    token:localStorage.getItem('token') || '',
    email:localStorage.getItem('email') || '',
    isAuthenticated:false
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
          },
          logout:(state)=>{
            state.token="";
            state.email="";
            localStorage.deleteItem('token');
            localStorage.deleteItem('email')
          }
    }

})

export const {login,logout}=authSlice.actions
export default authSlice.reducer