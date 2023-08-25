import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card";
import { setSentEmails, markSentEmailAsRead, deleteSentEmail } from "../store/sentbox";

const Sentbox = () => {
  const [expandedEmail, setExpandedEmail] = useState(false);
  const sentEmailsFromStore = useSelector((state) => state.sentbox); // Using the sentbox state
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSentboxEmails();
  }, []);

  const fetchSentboxEmails = async () => {
    try {
      const response = await fetch(
        "https://login-4cf44-default-rtdb.firebaseio.com/emails.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch emails.");
      }

      const emailsData = await response.json();

      const sentEmails = Object.keys(emailsData)
        .filter((key) => emailsData[key].recipient === userEmail && emailsData[key].type === "sent") // Filter by senderEmail
        .map((key) => ({
          firebaseKey: key,
          ...emailsData[key]
        }));

      dispatch(setSentEmails(sentEmails));
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleEmailClick = () => {
    setExpandedEmail(!expandedEmail);
  };

  const markAsRead = async (emailId, firebaseKey) => {
    dispatch(markSentEmailAsRead(emailId));
    const updatedEmail = {
      ...sentEmailsFromStore.find(email => email.firebaseKey === firebaseKey),
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

      console.log("Email marked as read in Firebase.", firebaseKey);
    } catch (error) {
      console.error("Error marking email as read in Firebase:", error);
    }
  };

  const deleteHandler = async (firebaseKey) => {
    dispatch(deleteSentEmail(firebaseKey));
    try {
      await fetch(`https://login-4cf44-default-rtdb.firebaseio.com/emails/${firebaseKey}.json`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Error deleting in Firebase:", error);
    }
  };

  return (
    <div>
      <h2>Sentbox</h2>

      <ul>
        {sentEmailsFromStore.map((email, index) => (
          <Card key={index}>
            {email.isNew && <span style={{ color: "blue" }}>● </span>}
            <strong>To:</strong> {email.sender}
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
            <button onClick={() => deleteHandler(email.firebaseKey)}>Delete</button>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Sentbox;
