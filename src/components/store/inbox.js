import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: [],
  reducers: {
    setInboxEmails: (state, action) => {
      return action.payload;
    },
    markEmailAsRead: (state, action) => {
      const emailId = action.payload;
      const email = state.find((email) => email.id === emailId);
      if (email) {
        email.isNew = false;
      }
    },
    addNewEmail: (state, action) => {
        state.push(action.payload);
      },
      deleteEmail:(state,action)=>{
        const firebaseKeyToDelete = action.payload;
        return state.filter((email)=>email.firebaseKey!==firebaseKeyToDelete)
      }
  },
});

export const { setInboxEmails, markEmailAsRead,addNewEmail,deleteEmail } = inboxSlice.actions;
export default inboxSlice.reducer;
