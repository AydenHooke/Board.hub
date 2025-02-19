import { createContext, useEffect, useState } from "react";
import { Thread } from "../ForumPage"
import axios from "axios";
import ReplyComment from "./ReplyComment";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";
import { useAccount } from "../../../Context/useAccount";
import { Link } from "react-router-dom";

export type Reply = {
  replyId: number,
  threadId: number,
  replyToId: number | null,
  accountId: number,
  username: string,
  content: string
  deleted: boolean
}

export const ReloadThreadContext = createContext(function(){});

function ThreadPage({
  threadId,
  title,
  content,
  accountId,
  username,
  forumId }: Thread
) {
  const { id: contextId } = useAccount();

  const [data, setData] = useState<Reply[]>([]);
  const [reload, setReload] = useState(0);
  function reloadThread() {
    setReload(reload + 1);
  }

  useEffect(() => {
    axios
      .get('http://18.224.45.201:8080/reply/get/' + threadId)
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [reload])

  return (
    <>
      <div className="forum-header">
        <h2>{title}</h2>
        <h4>Posted by: <Link to={`/account/${accountId}`}>{username}</Link></h4>
        {<button onClick={reloadThread} className="reload-button">
        <b>Reload Thread</b>
        <i className="fas fa-sync-alt"></i>
      </button>}
      </div>

      <div className="thread-page-container">
       <div className="thread-content">
        <b>{username} says: </b><span>{content}</span>
        <hr/>
       </div>

       <ReloadThreadContext.Provider value={reloadThread}>
        <div>
          {(contextId != '') &&
            <CreateReplyLogic
              threadId={threadId}
              title={title}
              content={content}
              accountId={accountId}
              forumId={forumId}
              replyToId={null}
            />
          }
        </div>


        {data.map((reply) => {
          return (
            <div className="replies" key={reply.replyId}>
              <ReplyComment
                replyId={reply.replyId}
                threadId={reply.threadId}
                replyToId={reply.replyToId}
                accountId={reply.accountId}
                username={reply.username}
                content={reply.content}
                deleted={reply.deleted}
              />
            </div>
          )
        })}
       </ReloadThreadContext.Provider>
      </div>
    </>
  )
}

export default ThreadPage