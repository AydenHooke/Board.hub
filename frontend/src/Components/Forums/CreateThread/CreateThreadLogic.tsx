import { FormEvent, useContext, useState } from "react"
import { Forum } from "../Forums";
import CreateThreadInput from "./CreateThreadInput";
import axios from "axios";
import { useAccount } from "../../../Context/useAccount";

function CreateThreadLogic({
    forumId,
    title,
    description,
    type}: Forum
) {
    const { id: contextId, jwt: contextJwt } = useAccount();

    const [threadTitle, setThreadTitle] = useState("");
    const [threadContent, setThreadContent] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/thread/post', {
                title: threadTitle,
                content: threadContent,
                accountId: contextId,
                forumId: forumId
            }, {
                headers: {"Authorization" : `${contextJwt}`}
            })
            .then((Response) => console.log(Response.data))
            .catch((error) => console.error(error));
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