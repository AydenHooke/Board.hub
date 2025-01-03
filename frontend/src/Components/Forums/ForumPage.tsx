import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Forum } from "./Forums";
import ThreadPage from "./Thread/ThreadPage";
import CreateThreadLogic from "./CreateThread/CreateThreadLogic";
import { AccountContext } from "../../Context/AccountContext";

export type Thread = {
    threadId: number,
    title: string,
    content: string,
    accountId: number,
    accountName: string,
    forumId: number
}

function ForumPage({
    forumId,
    title,
    description,
    type}: Forum
) {
    const context = useContext(AccountContext);

    const [data, setData] = useState<Thread[]>([]);
    const [threadId, setThreadId] = useState(-1);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(false);
        axios
            .get('http://localhost:8080/thread/get/' + forumId)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [reload])

    return (
        <>
            {(threadId == -1) && <h2>{title}</h2>}
            {(threadId == -1) && <h3>{description}</h3>}

            {(threadId == -1) && <button onClick={(e: any) => setReload(true)}>Reload</button>}

            {
                (context?.id != '' && threadId == -1) && <CreateThreadLogic
                    forumId={forumId}
                    title={title}
                    description={description}
                    type={type}
                />
            }

            {(threadId == -1) && (<br/>)}
            {(threadId == -1) && (<br/>)}

            {data.map((thread) => {
                return (
                    <>
                        <div key={thread.threadId}>
                            {
                                (threadId == -1) &&
                                <button onClick={
                                    (e: any) => setThreadId(thread.threadId)
                                }>{thread.title}</button>
                            }

                            {
                                (threadId == thread.threadId) && <ThreadPage
                                    threadId={thread.threadId}
                                    title={thread.title}
                                    content={thread.content}
                                    accountId={thread.accountId}
                                    accountName={thread.accountName}
                                    forumId={thread.forumId}
                                />
                            }
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default ForumPage