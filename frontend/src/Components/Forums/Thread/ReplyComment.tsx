import { useEffect, useState } from "react";
import { Reply } from "./ThreadPage";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";

function ReplyComment({
    id,
    thread_id,
    reply_id,
    user_id,
    content}: Reply
) {    
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (reply_id != null) {
            const parentReply = document.getElementById((reply_id).toString());
            const childReply = document.createElement("div");

            childReply.id = id.toString();
            childReply.innerHTML = content + createReply();
            parentReply?.appendChild(childReply);
        }
    }, [])

    function createReply() {
        return (
            <>
                <br/>
                {!isVisible &&<button onClick={() => setIsVisible(true)}>Reply to comment</button>}
                {isVisible &&
                    <div>
                        <CreateReplyLogic
                            reply_id={reply_id}
                            id={thread_id}
                            title={"null"}
                            content={"null"}
                            user_id={user_id}
                            forum_id={0}
                        />
                    </div>
                }
            </>
        )
    }

    return (
        <>
            {(reply_id != null) ? (
                <></>
            ) : (
                <div id={(id).toString()}>
                    {content}
                    {createReply()}
                </div>
            )}
        </>
    )
}

export default ReplyComment