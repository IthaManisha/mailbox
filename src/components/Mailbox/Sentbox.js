import React, { useState } from "react";
import { useSelector} from "react-redux";
import Card from "../UI/Card";
import useMarkEmailAsRead from "./MarkAsRead";
import useDeleteMail from "./DeleteEmail";
import useFetchEmails from "./FetchEmail";

const Sentbox = () => {
  const [expandedEmail, setExpandedEmail] = useState(false);
  const sentEmailsFromStore = useSelector((state) => state.sentbox); // Using the sentbox state

  const handleEmailClick = () => {
    setExpandedEmail(!expandedEmail);
  };

  const markSentEmailAsRead =useMarkEmailAsRead();

  const deleteSentEmailHandler=useDeleteMail();

  useFetchEmails("https://login-4cf44-default-rtdb.firebaseio.com/emails.json","sent");

  return (
    <div>
      <h2 style={{marginLeft:'45%'}}>Sentbox</h2>

      <ul>
        {sentEmailsFromStore.map((email, index) => (
          <Card key={index}>
            {email.isNew && <span style={{ color: "blue" }}>● </span>}
            <strong>To:</strong> {email.sender}
            <br />
            <strong>Subject:</strong> {email.subject}
            <br />
            <div style={{marginBottom:'5px'}}>
                <button 
                onClick={() => markSentEmailAsRead(email.firebaseKey,"sentbox")} 
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
              onClick={() => deleteSentEmailHandler(email.firebaseKey,"sentbox")} 
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

export default Sentbox;
