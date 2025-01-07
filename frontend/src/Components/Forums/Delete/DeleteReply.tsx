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

  const [isVisable, setIsVisable] = useState(false);
  const [isVisable2, setIsVisable2] = useState(true);

  const reloadThreadContext = useContext(ReloadThreadContext);

  function DeleteSubmit() {
    axios
      .delete(`http://localhost:8080/reply/${replyId}`, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => {console.log(Response.data); reloadThreadContext();})
      .catch((error) => console.error(error));
    setIsVisable(false);
    setIsVisable2(false);
  }

  return (
    <>
      {((!isVisable) && (isVisable2)) && <button onClick={() => setIsVisable(true)}>Delete Reply?</button>}
      {(isVisable) && <p>Are you sure you want to Delete:</p>}
      {(isVisable) && <button onClick={DeleteSubmit}>Confirm</button>}
      {(isVisable) && <button onClick={() => setIsVisable(false)}>Cancel</button>}
    </>
  )
}

export default DeleteReply