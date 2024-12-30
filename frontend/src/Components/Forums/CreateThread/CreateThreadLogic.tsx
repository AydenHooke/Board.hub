import { FormEvent, useContext, useState } from "react"
import { Forum } from "../Forums";
import CreateThreadInput from "./CreateThreadInput";
import axios from "axios";
import { AccountContext } from "../../../Context/AccountContext";

function CreateThreadLogic({
    id,
    title,
    description,
    type}: Forum
) {
    const context = useContext(AccountContext);

    const [threadTitle, setThreadTitle] = useState("");
    const [threadContent, setThreadContent] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/Thread', {
                title: threadTitle,
                content: threadContent,
                user_id: 0,
                forum_id: id
            }, {
                headers: {"authorization" : `Bearer ${context?.jwt}`}
            })
            .then((Response) => console.log(Response.data))
            .catch((Response) => console.error(Response.data));
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