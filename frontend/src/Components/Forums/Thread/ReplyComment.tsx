import { useState } from "react";
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

    function appendChild() {
        const parentReply = document.getElementById(`${replyToId}`)!;
        const childReply = document.getElementById(`${replyId}`)!;
        parentReply?.appendChild(childReply);
        
        return (<></>)
    }

    return (
        <>
            {(replyToId != null) ? (
                <>
                    <div className="replyToReply" id={`${replyId}`}>
                        <div className="reply">
                            {content}
                            {(contextId != '') && createReply()}
                        </div>
                    </div>
                    {appendChild()}
                </>
            ) : (
                <div className="rootReply" id={`${replyId}`}>
                    <div className="reply">
                        {content}
                        {(contextId != '') && createReply()}
                    </div>
                </div>
            )}
        </>
    )
}

export default ReplyComment