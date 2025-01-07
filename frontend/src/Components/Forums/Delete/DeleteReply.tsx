import axios from "axios";
import { useContext, useState } from "react"
import { useAccount } from "../../../Context/useAccount";
import { ReloadThreadContext, Reply } from "../Thread/ThreadPage";

function DeleteReply({
  replyId,
  threadId,
  replyToId,
  accountId,
  username,
  content,
  deleted }: Reply
) {
  const { jwt: contextJwt } = useAccount();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(true);

  const reloadThreadContext = useContext(ReloadThreadContext);

  function DeleteSubmit() {
    axios
      .delete(`http://localhost:8080/reply/${replyId}`, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => {console.log(Response.data); reloadThreadContext();})
      .catch((error) => console.error(error));
    setIsVisible(false);
    setIsVisible2(false);
  }

  return (
    <>
      {((!isVisible) && (isVisible2)) && <button onClick={() => setIsVisible(true)}>Delete Reply?</button>}
      {(isVisible) && <p>Are you sure you want to Delete:</p>}
      {(isVisible) && <button onClick={DeleteSubmit}>Confirm</button>}
      {(isVisible) && <button onClick={() => setIsVisible(false)}>Cancel</button>}
    </>
  )
}

export default DeleteReply