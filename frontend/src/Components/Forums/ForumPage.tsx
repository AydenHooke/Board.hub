import axios from "axios";
import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Forum } from "./Forums";
import ThreadPage from "./Thread/ThreadPage";

export type Thread = {
    id: number,
    title: string,
    content: string,
    user_id: number,
    forum_id: number
}

function ForumPage({
    id,
    title,
    description,
    type}: Forum
) {
    const [data, setData] = useState<Thread[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/Forum/' + id)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [])

    return (
        <>
            <h2>{title}</h2>
            <h3>{description}</h3>

            {data.map((thread) => {
                return (
                    <>
                        <BrowserRouter>
                            <Routes>
                                <Route path={'/Forums/' + title + '/' + thread.title} element={
                                    <ThreadPage
                                        id={thread.id}
                                        title={thread.title}
                                        content={thread.content}
                                        user_id={thread.user_id}
                                        forum_id={thread.forum_id}
                                    />
                                }></Route>
                            </Routes>
                        </BrowserRouter>
                        <div id={(thread.id).toString()}>
                            <Link to={"/Forums/" + title + '/' + thread.title}>{thread.title}</Link>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default ForumPage