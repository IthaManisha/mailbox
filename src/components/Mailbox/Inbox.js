/*import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"; // Import useSelector
import Card from "../UI/Card";
import { setInboxEmails, markEmailAsRead} from '../store/inbox'


const Inbox = () => {
  const [inboxEmails, setInboxEmails] = useState([]);
  const [expandedEmail,setExpandedEmail]=useState(false);
  const userEmail = useSelector(state=>state.auth.email); 
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInboxEmails();
  }, []);

  const fetchInboxEmails = async () => {
    try {
      const response = await fetch(
        'https://login-4cf44-default-rtdb.firebaseio.com/emails.json' // Replace with your Firebase URL
      );

      if (!response.ok) {
        throw new Error('Failed to fetch emails.');
      }

      const emailsData = await response.json();
      const inboxEmails = Object.values(emailsData).filter(email => email.recipient === userEmail); // Filter emails sent to the recipient
      setInboxEmails(inboxEmails);
      dispatch(setInboxEmails(inboxEmails));
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };
  const handleEmailClick = () => {
    // Toggle expanded email
    setExpandedEmail(!expandedEmail)
  };
  const markAsRead = (emailId) => {
    dispatch(markEmailAsRead(emailId));
  };

  return (
    <div>
      <h2>Inbox</h2>
      
      <ul>
        {inboxEmails.map((email, index) => (
          <Card key={index}  >
            <span style={{ color: "blue" }}>● </span>
            <strong>From:</strong> {email.sender}<br />
            <strong>Subject:</strong> {email.subject}<br/>
            <button onClick={() => markAsRead(email.id)}>Mark as Read</button>
            <button onClick={() => handleEmailClick()}>show</button>
            {expandedEmail && (
              <div>
                <strong>Message:</strong> {email.content}
              </div>
            )}
          </Card>
        ))}
      </ul>
     
    </div>
  );
};

export default Inbox;*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card";
import { setInboxEmails, markEmailAsRead,deleteEmail} from "../store/inbox";

const Inbox = () => {
  const [expandedEmail, setExpandedEmail] = useState(false);
  const inboxEmailsFromStore = useSelector((state) => state.inbox);
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  

  useEffect(() => {
    fetchInboxEmails();
  }, []);

  const fetchInboxEmails = async () => {
    try {
      const response = await fetch(
        "https://login-4cf44-default-rtdb.firebaseio.com/emails.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emails.");
      }

      const emailsData = await response.json();
      
        const inboxEmails = Object.keys(emailsData)
        .filter((key) => emailsData[key].recipient === userEmail && emailsData[key].type === "receive")
        .map((key) => ({
            firebaseKey: key,
            ...emailsData[key]
        }));
        
        
         
       
        
      dispatch(setInboxEmails(inboxEmails));
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleEmailClick = () => {
    setExpandedEmail(!expandedEmail);
  };

  const markAsRead = async (emailId, firebaseKey) => {
    dispatch(markEmailAsRead(emailId));
    console.log('firebasekey',firebaseKey)
    const updatedEmail = {
        ...inboxEmailsFromStore.find(email => email.firebaseKey === firebaseKey),
        isNew: false,
        timestamp: new Date().toISOString()
      };
    try {
        await fetch(
          `https://login-4cf44-default-rtdb.firebaseio.com/emails/${firebaseKey}.json`,
          {
            method: "PUT", // Use PATCH method to update specific fields
            body: JSON.stringify(updatedEmail), // Update isNew to false
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        console.log("Email marked as read in Firebase.",firebaseKey);
      } catch (error) {
        console.error("Error marking email as read in Firebase:", error);
      }
  };

  const deleteHandler=async(firebaseKey)=>{
    dispatch(deleteEmail(firebaseKey));
    try{
      await fetch(`https://login-4cf44-default-rtdb.firebaseio.com/emails/${firebaseKey}.json`,{
        method:"DELETE"
      })
    }catch(error){
      console.error("Error deleting in Firebase:", error);
    }
  }
  

  return (
    <div>
      <h2>Inbox</h2>

      <ul>
        {inboxEmailsFromStore.map((email, index) => (
          <Card key={index}>
            {email.isNew && <span style={{ color: "blue" }}>● </span>}
            <strong>From:</strong> {email.sender}
            <br />
            <strong>Subject:</strong> {email.subject}
            <br />
            <button onClick={() => markAsRead(email.id, email.firebaseKey)}>Mark as Read</button>
            <button onClick={() => handleEmailClick()}>Show</button>
            {expandedEmail && (
              <div>
                <strong>Message:</strong> {email.content}
              </div>
            )}
            <button onClick={()=>deleteHandler(email.firebaseKey)}>Delete</button>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
