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
    username: string,
    content: string
}

function ThreadPage({
    threadId,
    title,
    content,
    accountId,
    username,
    forumId}: Thread
) {
    const { id: contextId } = useAccount();

    const [data, setData] = useState<Reply[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(false);
        axios
            .get('http://localhost:8080/reply/get/' + threadId)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [reload])

    return (
        <>
            <h2>{title}</h2>
            <h3>Posted by: {username}</h3>
            <h4>{content}</h4>


            <button onClick={(e: any) => setReload(true)}>Reload</button>

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
                            username={reply.username}
                            content={reply.content}
                        />
                    </>
                )
            })}
        </>
    )
}

export default ThreadPage