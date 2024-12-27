import { useEffect, useState } from "react";
import { Thread } from "../ForumPage"
import axios from "axios";

export type Reply = {
    id: number,
    thread_id: number,
    reply_id: number,
    user_id: number,
    content: string
}

function ThreadPage({
    id,
    title,
    content,
    user_id,
    forum_id}: Thread
) {
    const [data, setData] = useState<Reply[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/Thread/' + id)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [])

    return (
        <>
            <h2>{title}</h2>
            <h3>{content}</h3>

            {data.map((reply) => {
                return (
                    <>
                        
                    </>
                )
            })}
        </>
    )
}

export default ThreadPage