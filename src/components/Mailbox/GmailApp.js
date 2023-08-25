import React, { useState } from "react";
import Inbox from "./Inbox"; // Import the Inbox component
import ComposeMail from "./ComposeMail"; // Import the ComposeMail component
import Sendbox from "./Sentbox";

const GmailApp = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [showInbox,setShowInbox]=useState(false);
  const [showSentbox,setShowSentbox]=useState(false);

  const toggleCompose = () => {
    setShowCompose(!showCompose);
  };

  const inboxToggle=()=>{
    setShowInbox(!showInbox);
  }

  const sentboxToggle=()=>{
    setShowSentbox(!showSentbox);
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
      <button onClick={sentboxToggle}>Sentbox</button>
      {showSentbox && <Sendbox />}
      
    </div>
  );
};

export default GmailApp;
