import { FormEvent, useContext, useState } from "react";
import axios from "axios";
import CreateReplyInput from "./CreateReplyInput";
import { useAccount } from "../../../../Context/useAccount";

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
    replyToId}: threadReply
) {
    const { id: contextId, jwt: contextJwt } = useAccount();

    const [replyContent, setReplyContent] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/reply/post', {
                threadId: threadId,
                replyToId: replyToId,
                accountId: contextId,
                content: replyContent
            }, {
                headers: {"authorization" : `${contextJwt}`}
            })
            .then((Response) => console.log(Response.data))
            .catch((error) => console.error(error));
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