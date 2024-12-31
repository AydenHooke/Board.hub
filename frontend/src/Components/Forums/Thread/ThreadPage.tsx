import { useContext, useEffect, useState } from "react";
import { Thread } from "../ForumPage"
import axios from "axios";
import ReplyComment from "./ReplyComment";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";
import { AccountContext } from "../../../Context/AccountContext";

export type Reply = {
    id: number,
    thread_id: number,
    reply_id: number,
    user_id: number,
    content: string
}

function ThreadPage({
    threadId,
    title,
    content,
    user_id,
    forum_id}: Thread
) {
    const context = useContext(AccountContext);

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
                { (context?.id != '') && 
                    <CreateReplyLogic
                        reply_id={null}
                        threadId={threadId}
                        title={title}
                        content={content}
                        user_id={user_id}
                        forum_id={forum_id}
                    />
                }
            </div>

            {data.map((reply) => {
                return (
                    <>
                        <ReplyComment
                            id={reply.id}
                            thread_id={reply.thread_id}
                            reply_id={reply.reply_id}
                            user_id={reply.user_id}
                            content={reply.content}
                        />
                    </>
                )
            })}
        </>
    )
}

export default ThreadPage