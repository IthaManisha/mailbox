import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const sendEmail = async (recipient, sender, subject, content) => {
    try {
      const response = await fetch(
        'https://login-4cf44-default-rtdb.firebaseio.com/emails.json', // Replace with your Firebase URL
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient: recipient,
            sender: sender,
            subject: subject,
            content: content,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send email.');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = editorState.getCurrentContent();
    const contentRaw = JSON.stringify(convertToRaw(content));
    
    try {
      // Send email
      await sendEmail(recipient, "sender@example.com", subject, contentRaw);
      
      // Store a copy in sender's "sentbox"
      await sendEmail("sender@example.com", recipient, subject, contentRaw);
  
      // Clear form fields
      setRecipient("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  

  return (
    <div>
      <h2>Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="email"
            value={recipient}
            onChange={handleRecipientChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={handleSubjectChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbar={{
              inline: { inDropdown: false }, // Bold, Italic, Underline
              list: { inDropdown: true }, // Bulleted and Numbered Lists
              textAlign: { inDropdown: true }, // Text Alignment
              link: { inDropdown: true }, // Insert Link
              history: { inDropdown: true }, // Undo and Redo
            }}
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ComposeMail;
