import { FormEvent, useContext, useState } from "react";
import { Thread } from "../../ForumPage"
import axios from "axios";
import CreateReplyInput from "./CreateReplyInput";
import { AccountContext } from "../../../../Context/AccountContext";

function CreateReplyLogic(
    reply_id: any,
    {threadId,
    title,
    content,
    user_id,
    forum_id}: Thread
) {
    const context = useContext(AccountContext);

    const [replyContent, setReplyContent] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/reply/post', {
                thread_id: threadId,
                reply_id: reply_id,
                user_id: context?.id,
                content: replyContent
            }, {
                headers: {"authorization" : `Bearer ${context?.jwt}`}
            })
            .then((Response) => console.log(Response.data))
            .catch((Response) => console.error(Response.data));
    }

    return (
        <>
            <CreateReplyInput
                replyContent={replyContent} setReplyContent={setReplyContent}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default CreateReplyLogic