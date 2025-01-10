import { FormEvent, useContext, useState } from "react"
import { Forum } from "../Forums";
import CreateThreadInput from "./CreateThreadInput";
import axios from "axios";
import { useAccount } from "../../../Context/useAccount";
import { ReloadForumContext } from "../ForumPage";

function CreateThreadLogic({
  forumId,
  title,
  description,
  type }: Forum
) {
  const { id: contextId, jwt: contextJwt } = useAccount();

  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");

  const reloadForumContext = useContext(ReloadForumContext);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    axios
      .post('http://18.224.45.201:8080/thread/post', {
        title: threadTitle,
        content: threadContent,
        accountId: contextId,
        forumId: forumId
      }, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response.data); reloadForumContext(); })
      .catch((error) => console.error(error));

    var title = document.getElementById('thread-title-input') as HTMLInputElement;
    var content = document.getElementById('thread-content-input') as HTMLInputElement;
    title.value = "";
    content.value = "";
  }

  return (
    <>
      <CreateThreadInput
        threadTitle={threadTitle} setThreadTitle={setThreadTitle}
        threadContent={threadContent} setThreadContent={setThreadContent}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default CreateThreadLogic