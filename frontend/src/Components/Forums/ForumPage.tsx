import axios from "axios";
import { useEffect, useState } from "react"
import { Forum } from "./Forums";
import ThreadPage from "./Thread/ThreadPage";
import CreateThreadLogic from "./CreateThread/CreateThreadLogic";
import DeleteThread from "./Delete/DeleteThread";
import { useAccount } from "../../Context/useAccount";

export type Thread = {
    threadId: number,
    title: string,
    content: string,
    accountId: number,
    username: string,
    forumId: number
}

function ForumPage({
    forumId,
    title,
    description,
    type}: Forum
) {
    const { id: contextId } = useAccount();

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
                (contextId != '' && threadId == -1) && <CreateThreadLogic
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
                                ((contextId == `${thread.accountId}`) && (threadId == -1)) && 
                                <DeleteThread 
                                    threadId={thread.threadId}
                                    title={""}
                                    content={""}
                                    accountId={0}
                                    username={""}
                                    forumId={0}
                                />
                            }

                            {
                                (threadId == thread.threadId) && <ThreadPage
                                    threadId={thread.threadId}
                                    title={thread.title}
                                    content={thread.content}
                                    accountId={thread.accountId}
                                    username={thread.username}
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