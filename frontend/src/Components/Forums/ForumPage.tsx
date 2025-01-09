import axios from "axios";
import { createContext, useEffect, useState } from "react"
import { Forum } from "./Forums";
import ThreadPage from "./Thread/ThreadPage";
import CreateThreadLogic from "./CreateThread/CreateThreadLogic";
import DeleteThread from "./Delete/DeleteThread";
import { useAccount } from "../../Context/useAccount";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

export type Thread = {
  threadId: number,
  title: string,
  content: string,
  accountId: number,
  username: string,
  forumId: number
}

export const ReloadForumContext = createContext(function () { });

function ForumPage({
  forumId,
  title,
  description,
  type }: Forum
) {
  const { id: contextId } = useAccount();

  const [data, setData] = useState<Thread[]>([]);
  const [threadId, setThreadId] = useState(-1);
  const [reload, setReload] = useState(0);
  function reloadForum() {
    setReload(reload + 1);
  }

  useEffect(() => {
    axios
      .get('http://localhost:8080/thread/get/' + forumId)
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [reload])

  return (
    <>
      <div className="forum-header">
        {(threadId == -1) && <h2>{title}</h2>}
        {(threadId == -1) && <h3>{description}</h3>}
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
            forumId={forumId}
            title={title}
            description={description}
            type={type}
          />
        }

        {(threadId == -1) && (<br />)}
        {(threadId == -1) && (<br />)}

        {data.map((thread) => {
          return (
            <div key={thread.threadId}>
              {
                  (threadId == -1) && 
                  <table className="forum-table">
                  <thead>
                    <tr>
                      <th className="forum-icon-head">Icon</th>
                      <th className="forum-title-head">Title</th>
                      <th className="forum-op-head">Original Poster</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr className="forum-row">
                    <td className="forum-icon-cell">
                      <FontAwesomeIcon icon={faComment} className="comment-icon" />
                    </td>
                    <td className="forum-title-cell">
                      <button className="forum-button" onClick={
                        (e: any) => setThreadId(thread.threadId)
                      }>{thread.title}
                      </button>
                    </td>
                    <td className="forum-op-cell">
                      {thread.username}
                    </td>
                  </tr>
                </tbody>
              </table>
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