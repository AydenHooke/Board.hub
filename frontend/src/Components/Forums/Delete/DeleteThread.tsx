import axios from "axios";
import { useContext, useState } from "react"
import { useAccount } from "../../../Context/useAccount";
import { ReloadForumContext, Thread } from "../ForumPage";

function DeleteThread({
  threadId,
  title,
  content,
  accountId,
  username,
  forumId }: Thread
) {
  const { jwt: contextJwt } = useAccount();

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(true);

  const reloadForumContext = useContext(ReloadForumContext);

  function DeleteSubmit() {
    axios
      .delete(`http://localhost:8080/thread/${threadId}`, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response.data); reloadForumContext(); })
      .catch((error) => console.error(error));
    setIsVisible(false);
    setIsVisible2(false);
  }

  return (
    <>
      {((!isVisible) && (isVisible2)) && <button onClick={() => setIsVisible(true)}>Delete Thread?</button>}
      {(isVisible) && <p>Are you sure you want to Delete:</p>}
      {(isVisible) && <button onClick={DeleteSubmit}>Confirm</button>}
      {(isVisible) && <button onClick={() => setIsVisible(false)}>Cancel</button>}
    </>
  )
}

export default DeleteThread