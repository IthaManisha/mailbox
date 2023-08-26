import React from "react";
import Inbox from "../Mailbox/Inbox";
import ComposeMail from "../Mailbox/ComposeMail";
import Sendbox from "../Mailbox/Sentbox";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div 
      style={{ 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        background: "rgb(22, 22, 22)",
        paddingBottom:'30px',
        alignItems:'center' }}>
        <div style={{color:'white',paddingLeft:'10px',paddingTop:'10px'}}>
          <h1>Email Editor and Sender</h1>
        </div>
        <div>
          <Link to="/compose" style={{color:'white',fontWeight:'bold',fontSize:'20px'}}>Compose</Link>
        </div>
        <div>
          <Link to="/inbox" style={{color:'white',fontWeight:'bold',fontSize:'20px'}}>Inbox</Link>
        </div>
        <div>
          <Link to="/sentbox" style={{color:'white',fontWeight:'bold',fontSize:'20px'}}>Sentbox</Link>
        </div>
        <div>
          <button onClick={handleLogout} style={{padding:'8px',borderRadius:'8px',background:'white',color:'rgb(41, 41, 252)'}}>Logout</button>
        </div>
      </div>

      <Routes>
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/sentbox" element={<Sendbox />} />
      </Routes>
    </Router>
  );
};

export default Home;
