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

      {((forumId != -1) && (threadId == -1)) && <button onClick={() => { setForumId(-1); reloadForums(); }}>Back</button>}

      <ReloadForumsContext.Provider value={reloadForums}>
        {
          // If none selected, display list of forums to select
          forumId == -1 && (
            <ul>
              {data.map((forum) => {
                return (
                  <li key={forum.forumId}>
                    {
                      (forumId == -1) &&
                      <button onClick={
                        (e: any) => setForumId(forum.forumId)
                      }>{forum.title}</button>
                    }
                  </li>
                )
              })}
            </ul>
          )
        }

        {
          // If selected, display current forum
          forumId != -1 && <ForumPage
            forum={data.filter((f) => f.forumId == forumId)[0]}
            threadId={threadId}
            setThreadId={setThreadId}
          />
        }
      </ReloadForumsContext.Provider>
    </>
  )
}

export default Forums