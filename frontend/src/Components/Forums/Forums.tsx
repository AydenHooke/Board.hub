import axios from "axios"
import { createContext, useEffect, useState } from "react"
import ForumPage from "./ForumPage";

export type Forum = {
  forumId: number,
  title: string,
  description: string,
  type: string
}

export const ReloadForumsContext = createContext(function () { });

function Forums() {
  const [data, setData] = useState<Forum[]>([]);
  const [forumId, setForumId] = useState(-1);
  const [threadId, setThreadId] = useState(-1);
  const [reload, setReload] = useState(0);
  function reloadForums() {
    setReload(reload + 1);
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/forum/get')
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [])

  return (
    <>
      {(forumId == -1) && <h2>Main Forums</h2>}

      {((forumId != -1) && (threadId == -1)) && <button onClick={() => {setForumId(-1); reloadForums();}}>Back</button>}

      <ReloadForumsContext.Provider value={reloadForums}>
        {data.map((forum) => {
          return (
            <ul key={forum.forumId}>
              <li>
              {
                (forumId == -1) &&
                <button onClick={
                  (e: any) => setForumId(forum.forumId)
                }>{forum.title}</button>
              }
              </li>

              <li>
              {
                (forumId == forum.forumId) && <ForumPage
                  forum={forum}
                  threadId={threadId}
                  setThreadId={setThreadId}
                />
              }
              </li>
              
            </ul>
          )
        })}
      </ReloadForumsContext.Provider>
    </>
  )
}

export default Forums