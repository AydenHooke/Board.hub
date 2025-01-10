import axios from "axios"
import { createContext, useEffect, useState } from "react"
import ForumPage from "./ForumPage";



export type Forum = {
  forumId: number,
  title: string,
  description: string,
  type: string
}

// eslint-disable-next-line react-refresh/only-export-components
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
      .get('http://18.224.45.201:8080/forum/get')
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [])

  const currentForum = forumId == -1 ? null : data.filter((f) => f.forumId == forumId)[0];

  return (
    <>

      <div>

        <a href="#" onClick={() => {

          // Return to forum selection
          if (forumId >= -1) {
            setForumId(-1);
            setThreadId(-1);
            reloadForums();
          }
        }}>
          Forums
        </a>

        {currentForum != null &&
          <a href="#" onClick={() => {

            // Return to thread selection
            if (threadId >= -1) {
              setThreadId(-1);
              reloadForums();
            }
          }}>
            &nbsp;-&gt; {(currentForum as Forum).title}
          </a>
        }

      </div>

      <ReloadForumsContext.Provider value={reloadForums}>
        {
          // If none selected, display list of forums to select
          forumId == -1 && (
           <div className="forums-container">
            <table className="forums-table" >
              <tbody>
                {data.map((forum) => {
                  return (
                    <tr key={forum.forumId} style={{ border: 'solid black 2px' }} className="forum-row">
                      <td>
                        {
                          (forumId == -1) &&
                          <a href="#" onClick={
                            () => setForumId(forum.forumId)
                          }
                          className="forum-link"
                          >{forum.title}</a>
                        }
                      </td>

                      <td>
                        {forum.description}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
           </div>
          )
        }

        {
          // If selected, display current forum
          forumId != -1 && <ForumPage
            forum={currentForum as Forum}
            threadId={threadId}
            setThreadId={setThreadId}
          />
        }
      </ReloadForumsContext.Provider>
    </>
  )
}

export default Forums