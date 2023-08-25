// inboxSlice.js
// ... (similar to before)

// sentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
  name: "sent",
  initialState: [],
  reducers: {
    setSentEmails: (state, action) => {
      return action.payload;
    },
    addNewSentEmail: (state, action) => {
      state.push(action.payload);
    },
    markSentEmailAsRead:(state, action) => {
        const emailId = action.payload;
        const email = state.find((email) => email.id === emailId);
        if (email) {
          email.isNew = false;
        }
      },
    deleteSentEmail: (state, action) => {
      // Implement logic to delete a sent email
      const firebaseKeyToDelete = action.payload;
        return state.filter((email)=>email.firebaseKey!==firebaseKeyToDelete)
    },
  },
});

export const { setSentEmails, addNewSentEmail,markSentEmailAsRead,deleteSentEmail } = sentSlice.actions;
export default sentSlice.reducer;
