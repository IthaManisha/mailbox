import React, { useState } from "react";
import Inbox from "./Inbox"; // Import the Inbox component
import ComposeMail from "./ComposeMail"; // Import the ComposeMail component

const GmailApp = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox,setShowInbox]=useState(false);

  const toggleCompose = () => {
    setShowCompose(!showCompose);
  };

  const inboxToggle=()=>{
    setShowInbox(!showInbox);
  }
   
  return (
    <div style={{}}>
      <div>
      <button onClick={toggleCompose}>Compose</button>
      {showCompose ? <ComposeMail /> : null}
      </div>
      <div>
      <button onClick={inboxToggle}>Inbox</button>
      {showInbox ? <Inbox /> : null}
      </div>
      
    </div>
  );
};

export default GmailApp;
