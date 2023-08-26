import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import useMarkEmailAsRead from "./MarkAsRead";
import useDeleteMail from "./DeleteEmail";
import useFetchEmails from "./FetchEmail";

const Inbox = () => {
  const [expandedEmail, setExpandedEmail] = useState(false);
  const inboxEmailsFromStore = useSelector((state) => state.inbox);

  const handleEmailClick = () => {
    setExpandedEmail(!expandedEmail);
  };

  const markAsRead = useMarkEmailAsRead()

  const deleteInboxMailHandler=useDeleteMail();

  useFetchEmails("https://login-4cf44-default-rtdb.firebaseio.com/emails.json","receive");
  
  return (
    <div>
      <h2 style={{marginLeft:'45%'}}>Inbox</h2>

      <ul>
        {inboxEmailsFromStore.map((email, index) => (
          <Card key={index}>
            {email.isNew && <span style={{ color: "blue" }}>● </span>}
            <strong >From:</strong> {email.sender}
            <br />
            <strong >Subject:</strong> {email.subject}
            <br />
            <div style={{marginBottom:'5px'}}>
                <button 
                  onClick={() => markAsRead(email.firebaseKey,"inbox")} 
                  style={{borderRadius:'6px',marginRight:'20px',background:'rgb(41, 41, 252)',color:'white'}}>
                    Mark as Read
                </button>
                <button 
                  onClick={() => handleEmailClick()} 
                  style={{borderRadius:'6px',background:'rgb(41, 41, 252)',color:'white'}}>
                    Show
                </button>
            </div>
            {expandedEmail && (
              <div>
                <strong>Message:</strong> {email.content}
              </div>
            )}
            <div>
            <button 
              onClick={()=>deleteInboxMailHandler(email.firebaseKey,"inbox")} 
              style={{borderRadius:'6px',background:'rgb(41, 41, 252)',color:'white'}}>
                Delete
            </button>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
