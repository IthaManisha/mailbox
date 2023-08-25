import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import inboxReducer from './inbox'
import sentboxReducer from "./sentbox";

const store=configureStore({
    reducer:{
        auth:authReducer,inbox: inboxReducer,sentbox:sentboxReducer
    }
})

export default store;