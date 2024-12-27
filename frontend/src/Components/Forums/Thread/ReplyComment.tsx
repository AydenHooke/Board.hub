import { useEffect } from "react";
import { Reply } from "./ThreadPage";

function ReplyComment({
    id,
    thread_id,
    reply_id,
    user_id,
    content}: Reply
) {    
    useEffect(() => {
        if (reply_id != null) {
            const parentReply = document.getElementById((reply_id).toString());
            const childReply = document.createElement("div");

            childReply.id = id.toString();
            childReply.innerHTML = content;
            parentReply?.appendChild(childReply);
        }
    }, [])

    return (
        <>
            {(reply_id != null) ? (
                <></>
            ) : (
                <div id={(id).toString()}>
                    {content}
                </div>
            )}
        </>
    )
}

export default ReplyComment