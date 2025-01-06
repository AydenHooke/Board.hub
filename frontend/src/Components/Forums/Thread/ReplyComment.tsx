import { useState } from "react";
import { Reply } from "./ThreadPage";
import { useAccount } from "../../../Context/useAccount";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";
import DeleteReply from "../Delete/DeleteReply";

function ReplyComment({
    replyId,
    threadId,
    replyToId,
    accountId,
    username,
    content}: Reply
) {
    const { id: contextId } = useAccount();

    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(true);

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

    function Delete() {
        return (
            <>
                <br/>
                {
                    (contextId == `${accountId}`) && 
                    <DeleteReply 
                        replyId={replyId}
                        threadId={0}
                        replyToId={0}
                        accountId={0}
                        username={""}
                        content={""}
                    />
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
                            <h6>Posted by: {username}</h6>

                            {content}
                            {Delete()}
                            {(contextId != '') && createReply()}
                        </div>
                    </div>
                    {appendChild()}
                </>
            ) : (
                <div className="rootReply" id={`${replyId}`}>
                    <div className="reply">
                        <h6>Posted by: {username}</h6>

                        {content}
                        {Delete()}
                        {(contextId != '') && createReply()}
                    </div>
                </div>
            )}
        </>
    )
}

export default ReplyComment