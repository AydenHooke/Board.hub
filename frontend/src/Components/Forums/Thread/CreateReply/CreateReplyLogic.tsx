import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import CreateReplyInput from "./CreateReplyInput";
import { useAccount } from "../../../../Context/useAccount";
import { ReloadThreadContext } from "../ThreadPage";

type threadReply = {
  threadId: number,
  title: string,
  content: string,
  accountId: number,
  forumId: number,
  replyToId: number | null
}

function CreateReplyLogic({
  threadId,
  title,
  content,
  accountId,
  forumId,
  replyToId }: threadReply
) {
  const { id: contextId, jwt: contextJwt } = useAccount();

  const [replyContent, setReplyContent] = useState("");

  const reloadThreadContext = useContext(ReloadThreadContext);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    axios
      .post('http://localhost:8080/reply/post', {
        threadId: threadId,
        replyToId: replyToId,
        accountId: contextId,
        content: replyContent
      }, {
        headers: { "authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response.data); reloadThreadContext(); })
      .catch((error) => console.error(error));

    setReplyContent('');

    var content = document.getElementById(`reply-content-input-${replyToId}`) as HTMLInputElement;
    content.value = "";
  }

  return (
    <>
      <CreateReplyInput
        replyContent={replyContent} setReplyContent={setReplyContent}
        handleSubmit={handleSubmit} reply_id={Number(replyToId)}
      />
    </>
  )
}

export default CreateReplyLogic