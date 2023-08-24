import React from "react";
import GmailApp from "../Mailbox/GmailApp";
import { useDispatch } from 'react-redux';
import { logout } from "../store/auth";

const Home = () => {
    const dispatch = useDispatch(); // Get the dispatch function from the Redux store

    const handleLogout = () => {
      dispatch(logout()); // Dispatch the logout action
    };
  return (
    <div style={{}}>
     <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
     <div>
      <h1>Email Editor and Sender</h1>
      </div>
      <div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      </div>
      <div>
      <GmailApp />
      </div>
    </div>
  );
};

export default Home
