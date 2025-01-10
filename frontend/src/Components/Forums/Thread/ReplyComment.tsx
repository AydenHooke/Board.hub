import { useEffect, useState } from "react";
import { Reply } from "./ThreadPage";
import { useAccount } from "../../../Context/useAccount";
import CreateReplyLogic from "./CreateReply/CreateReplyLogic";
import DeleteReply from "../Delete/DeleteReply";
import { Link } from "react-router-dom";

function ReplyComment({
  replyId,
  threadId,
  replyToId,
  accountId,
  username,
  content,
  deleted }: Reply
) {
  const { id: contextId } = useAccount();

  const [isVisible, setIsVisible] = useState(false);

  function createReply() {
    return (
      <>
        <br />
        {!isVisible && <a href="javascript:void(0)" onClick={() => setIsVisible(true)}>reply</a>}
        {isVisible &&
          <div>
            <CreateReplyLogic
              threadId={threadId}
              title={"null"}
              content={"null"}
              accountId={accountId}
              forumId={0}
              replyToId={replyId}
            />
          </div>
        }
      </>
    )
  }

  function createDelete() {
    return (
      <>
      &nbsp;
        {
          (contextId == `${accountId}`) &&
          <DeleteReply
            replyId={replyId}
            threadId={0}
            replyToId={0}
            accountId={0}
            username={""}
            content={""}
            deleted={deleted}
          />
        }
      </>
    )
  }

  useEffect(() => {
    const parentReply = document.getElementById(`${replyToId}`)!;
    const childReply = document.getElementById(`${replyId}`)!;

    parentReply?.appendChild(childReply);
  }, []);

  return (
    <>
      {(replyToId != null) ? (
        <>
          <div className="replyToReply" id={`${replyId}`} style={{ border: 'solid transparent 2px', borderLeft: 'solid transparent 6px' }}>
            <div className="reply">
              <h6>Posted by: <Link to={`/account/${accountId}`}>{username}</Link></h6>

              {content}
              {(contextId != '') && createReply()}
              {(!deleted) && createDelete()}
            </div>
          </div>
        </>
      ) : (
        <div className="rootReply" id={`${replyId}`} >
          <div className="reply">
            <h6>Posted by: <Link to={`/account/${accountId}`}>{username}</Link></h6>

            {content}
            {(contextId != '') && createReply()}
            {(!deleted) && createDelete()}
          </div>
        </div>
      )}
    </>
  )
}

export default ReplyComment