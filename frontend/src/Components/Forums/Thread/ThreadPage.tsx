import { useContext, useEffect, useState } from "react";
import { Thread } from "../ForumPage"
import axios from "axios";
import ReplyComment from "./ReplyComment";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";
import { useAccount } from "../../../Context/useAccount";

export type Reply = {
    replyId: number,
    threadId: number,
    replyToId: number | null,
    accountId: number,
    content: string
}

function ThreadPage({
    threadId,
    title,
    content,
    accountId,
    forumId}: Thread
) {
    const { id: contextId } = useAccount();

    const [data, setData] = useState<Reply[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/reply/get/' + threadId)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [])

    return (
        <>
            <h2>{title}</h2>
            <h3>{content}</h3>

            <div>
                { (contextId != '') && 
                    <CreateReplyLogic
                        threadId={threadId}
                        title={title}
                        content={content}
                        accountId={accountId}
                        forumId={forumId}
                        replyToId={null}
                    />
                }
            </div>

            {data.map((reply) => {
                return (
                    <>
                        <ReplyComment
                            replyId={reply.replyId}
                            threadId={reply.threadId}
                            replyToId={reply.replyToId}
                            accountId={reply.accountId}
                            content={reply.content}
                        />
                    </>
                )
            })}
        </>
    )
}

export default ThreadPage