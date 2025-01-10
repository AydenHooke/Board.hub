import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Forum } from "./Forums";
import ThreadPage from "./Thread/ThreadPage";
import CreateThreadLogic from "./CreateThread/CreateThreadLogic";
import DeleteThread from "./Delete/DeleteThread";
import { useAccount } from "../../Context/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

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
  setThreadId }: useStateProp
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


  let currentThread = threadId == -1 ? null : data.filter(t => t.threadId == threadId)[0];

  return (
    <>
      <div className="forum-header">
        {(threadId == -1) && 
        <>
          <h1>{forum.title}</h1>
          <p>{forum.description}</p>
        </>
        }
      </div>

      {(threadId == -1) && (
        <button onClick={reloadForum} className="reload-button">
          <b>Reload Threads</b>
          <i className="fas fa-sync-alt"></i>
        </button>
      )}

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

        {threadId == -1 ?
         <div className="forums-container">
          <table className="forums-table">
            {data.map((thread) => {
              return (
                <tr key={thread.threadId} style={{ border: 'solid black 2px' }} className="forum-row">

                  <td>
                    {
                      (threadId == -1) &&
                      <a href="#" onClick={
                        (e: any) => setThreadId(thread.threadId)
                      }
                      className="forum-link"
                      >{thread.title}</a>
                    }
                  </td>

                  <td>
                    {(threadId == -1) &&
                      <>
                        By: <Link to={`/account/${thread.accountId}`}>{thread.username}</Link>
                      </>
                    }
                  </td>

                  <td>
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
                  </td>
                </tr>
              )
            })}
          </table>
          </div>
          :
          <>{
            // If selected, display current thread
            threadId != -1 &&
            <ThreadPage
              threadId={Number(currentThread?.threadId)}
              title={String(currentThread?.title)}
              content={String(currentThread?.content)}
              accountId={Number(currentThread?.accountId)}
              username={String(currentThread?.username)}
              forumId={Number(currentThread?.forumId)}
            />
          }
          </>
        }
      </ReloadForumContext.Provider>
    </>
  )
}

export default ForumPage