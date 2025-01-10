import { useEffect, useState } from "react";
import { game } from "../Games/GameCollections/GameCollectionsLogic"
import GameCollectionsDisplay from "../Games/GameCollections/GameCollectionsDisplay";
import axios from "axios";

function AllGames() {
    const [data, setData] = useState<game[]>([]);

    useEffect(() => {
        axios
            .get(`http://18.224.45.201:8080/game/getAllGames`)
            .then((Response) => setData(Response.data))
            .catch((error) => console.error(error));
    }, [])

    return (
        <>
            <h1>Search all games</h1>

            <GameCollectionsDisplay data={data}/>
        </>
    )
}

export default AllGames