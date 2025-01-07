import axios from "axios"
import { useEffect, useState } from "react"
import ForumPage from "./ForumPage";

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

      {data.map((forum) => {
        return (
          <div key={forum.forumId}>
            {
              (forumId == -1) &&
              <button onClick={
                (e: any) => setForumId(forum.forumId)
              }>{forum.title}</button>
            }

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