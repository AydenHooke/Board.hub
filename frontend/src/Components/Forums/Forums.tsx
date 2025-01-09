import axios from "axios"
import { useEffect, useState } from "react"
import ForumPage from "./ForumPage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';


export type Forum = {
  forumId: number,
  title: string,
  description: string,
  type: string
}

function Forums() {
  const [data, setData] = useState<Forum[]>([]);
  const [forumId, setForumId] = useState(-1);
  

  useEffect(() => {
    axios
      .get('http://localhost:8080/forum/get')
      .then((Response) => setData(Response.data))
      .catch((error) => console.error('Error getting data, ', error));
  }, [])

  return (
    <>
      {(forumId == -1) && <h2>Main Forums</h2>}

      {/* <ul className="starter-thread">
        <li>Threads</li>
        <li>OP</li>
      </ul> */}

     

      {data.map((forum) => {
        return (
          <div key={forum.forumId}>
            <ul>
                {
                  (forumId == -1) &&
                  (<li className="forum">
                  <FontAwesomeIcon icon={faComment} className="comment-icon"/>
                  <div className="vertical-line forum-line"></div>
                  <button className="forum-button" onClick={
                    (e: any) => setForumId(forum.forumId)
                  }>{forum.title}</button>
                  </li>)
                }
            </ul> 
                

                {
                  (forumId == forum.forumId) && <ForumPage
                    forumId={forum.forumId}
                    title={forum.title}
                    description={forum.description}
                    type={forum.type}
                  />
                }
          </div>
        )
      })}
    </>
  )
}

export default Forums