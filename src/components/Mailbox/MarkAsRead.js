import { useDispatch,useSelector} from "react-redux";
import { markEmailAsRead} from "../store/inbox"; // Import necessary action creators
import { markSentEmailAsRead } from "../store/sentbox";

function useMarkEmailAsRead() {
  const dispatch = useDispatch();
  const inboxEmailsStore = useSelector((state) => state.inbox);
  const sentEmailsStore = useSelector((state) => state.sentbox); 

  const markAsRead = async (firebaseKey, type) => {
    const actionToDispatch = type === "inbox" ? markEmailAsRead : markSentEmailAsRead;
    dispatch(actionToDispatch(firebaseKey)); // Dispatch the appropriate action based on the component
    const updatedEmail = type === "inbox" ? 
    {
        ...inboxEmailsStore.find(
          (email) => email.firebaseKey === firebaseKey
        ),
        isNew: false,
        timestamp: new Date().toISOString(),
      }
    :{
        ...sentEmailsStore.find(email => email.firebaseKey === firebaseKey),
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

  return markAsRead;
}

export default useMarkEmailAsRead;
