import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setInboxEmails} from "../store/inbox"; // Import the appropriate action types
import { setSentEmails } from "../store/sentbox";

const useFetchEmails = (fetchUrl, emailType) => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.email);
  
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(fetchUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch emails.");
        }

        const emailsData = await response.json();

        const emails = Object.keys(emailsData)
          .filter((key) => emailsData[key].recipient === userEmail && emailsData[key].type === emailType)
          .map((key) => ({
            firebaseKey: key,
            ...emailsData[key]
          }));

        if (emailType === "receive") {
          dispatch(setInboxEmails(emails));
        } else if (emailType === "sent") {
          dispatch(setSentEmails(emails));
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [dispatch, fetchUrl, emailType]);
};

export default useFetchEmails;
