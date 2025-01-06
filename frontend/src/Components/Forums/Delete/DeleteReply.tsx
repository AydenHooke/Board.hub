import axios from "axios";
import { useState } from "react"
import { useAccount } from "../../../Context/useAccount";
import { Reply } from "../Thread/ThreadPage";

function DeleteReply({
    replyId,
    threadId,
    replyToId,
    accountId,
    username,
    content}: Reply
) {
    const { jwt: contextJwt } = useAccount();

    const [isVisable, setIsVisable] = useState(false);
    const [isVisable2, setIsVisable2] = useState(true);

    function DeleteSubmit() {
        axios
            .delete(`http://localhost:8080/reply/${replyId}`, {
                headers: {"Authorization" : `${contextJwt}`}
            })
            .then((Response) => console.log(Response.data))
            .catch((error) => console.error(error));
        setIsVisable(false);
        setIsVisable2(false);
    }

    function confirmDelete() {
        setIsVisable(true);

        return (
            <>
                {(isVisable) && <p>Are you sure you want to Delete:</p>}
                {(isVisable) && <button onClick={DeleteSubmit}>Confirm</button>}
                {(isVisable) && <button onClick={() => setIsVisable(false)}>Cancel</button>}
            </>
        )
    }

    return (
        <>
            {((!isVisable) && (isVisable2)) && <button onClick={confirmDelete}>Delete Reply?</button>}
        </>
    )
}

export default DeleteReply