import axios from "axios"
import { useEffect, useState } from "react"

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
            .get('http://localhost:8080/Forms')
            .then((Response) => setData(Response.data))
            .catch((error) => console.error('Error getting data, ', error));
    }, [])

    function goToForum(forum: Forum) {
        
    }

    return (
        <>
            <h2>Main Forums</h2>
            {data.map((forum) => {
                return (
                    <button onClick={
                        () => goToForum(forum)
                    }>
                        {forum.title}
                    </button>
                )
            })}
        </>
    )
}

export default Forums