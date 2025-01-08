import axios from "axios";
import { createContext, useEffect, useState } from "react"
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

type useStateProp = {
  forum: Forum
  threadId: number, setThreadId: React.Dispatch<React.SetStateAction<number>>
}

export const ReloadForumContext = createContext(function () { });

function ForumPage({
  forum,
  threadId,
  setThreadId}: useStateProp
) {
  const { id: contextId } = useAccount();

  const [data, setData] = useState<Thread[]>([]);
  const [reload, setReload] = useState(0);
  function reloadForum() {
    setReload(reload + 1);
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/thread/get/' + forum.forumId)
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [reload])

  return (
    <>
      {(threadId == -1) && <h2>{forum.title}</h2>}
      {(threadId == -1) && <h3>{forum.description}</h3>}

      {(threadId == -1) && <button onClick={reloadForum}>Reload Forums</button>}
      {(threadId != -1) && <button onClick={() => {setThreadId(-1); reloadForum();}}>Back</button>}

      <ReloadForumContext.Provider value={reloadForum}>
        {
          (contextId != '' && threadId == -1) && <CreateThreadLogic
            forumId={forum.forumId}
            title={forum.title}
            description={forum.description}
            type={forum.type}
          />
        }

        {(threadId == -1) && (<br />)}
        {(threadId == -1) && (<br />)}

        {data.map((thread) => {
          return (
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
          )
        })}
      </ReloadForumContext.Provider>
    </>
  )
}

export default ForumPage