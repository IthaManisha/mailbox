import { useDispatch} from "react-redux";
import { deleteEmail } from "../store/inbox";
import { deleteSentEmail } from "../store/sentbox";

function useDeleteMail(){
    const dispatch = useDispatch();

    const deleteMail= async(firebaseKey,type)=>{
        const actionToDispatch = type === "inbox" ? deleteEmail : deleteSentEmail
        dispatch(actionToDispatch(firebaseKey));

    try{
      await fetch(`https://login-4cf44-default-rtdb.firebaseio.com/emails/${firebaseKey}.json`,{
        method:"DELETE"
      })
    }catch(error){
      console.error("Error deleting in Firebase:", error);
    }

    }
    return deleteMail;
}

export default useDeleteMail;
