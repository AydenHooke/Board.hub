import axios from "axios"
import { useEffect, useState } from "react"
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ForumPage from "./ForumPage";

export type Forum = {
    id: number,
    title: string,
    description: string,
    type: string
}

function Forums() {
    const [data, setData] = useState<Forum[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/forum/get')
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [])

    return (
        <>
            <h2>Main Forums</h2>

            <Routes>
                {data.map((forum) => {
                    return (
                        <>
                            <Route path={'/Forums/' + forum.title} element={
                                <ForumPage
                                    id={forum.id}
                                    title={forum.title}
                                    description={forum.description}
                                    type={forum.type}
                                />
                            }></Route>
                        </>
                    )
                })}
            </Routes>
            {data.map((forum) => {
                return (
                    <>
                        <div>
                            <Link to={"/Forums/" + forum.title}>{forum.title}</Link>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export default Forums