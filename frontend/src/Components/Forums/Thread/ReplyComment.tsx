import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { Reply } from "./ThreadPage";
import { useAccount } from "../../../Context/useAccount";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";

function ReplyComment({
    replyId,
    threadId,
    replyToId,
    accountId,
    content}: Reply
) {    
    const { id: contextId } = useAccount();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        console.log("test");
        if (replyToId != null) {
            const parentReply = document.getElementById((replyToId).toString());
            const childReply = document.createElement("div");
            const staticElement = renderToString(createReply());
            
            if (contextId != '') childReply.innerHTML = content + staticElement;
            else childReply.innerHTML = content;

            childReply.id = replyId + "";
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
                            threadId={threadId}
                            title={"null"}
                            content={"null"}
                            accountId={accountId}
                            forumId={0}
                            replyToId={replyId}
                        />
                    </div>
                }
            </>
        )
    }

    return (
        <>
            {(replyToId != null) ? (
                <></>
            ) : (
                <div id={(replyId).toString()}>
                    {content}
                    {(contextId != '') && createReply()}
                </div>
            )}
        </>
    )
}

export default ReplyComment