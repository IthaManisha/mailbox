import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Card from "../UI/Card";


const Inbox = () => {
  const [inboxEmails, setInboxEmails] = useState([]);
  const userEmail = useSelector(state=>state.auth.email); 

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
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <div>
      <h2>Inbox</h2>
      <Card>
      <ul>
        {inboxEmails.map((email, index) => (
          <li key={index}>
            <strong>From:</strong> {email.sender}<br />
            <strong>Subject:</strong> {email.subject}<br/>
            <strong>Message:</strong>{email.content}
          </li>
        ))}
      </ul>
      </Card>
    </div>
  );
};

export default Inbox;
