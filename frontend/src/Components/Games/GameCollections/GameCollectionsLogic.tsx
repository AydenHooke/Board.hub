import { useEffect, useState } from "react"
import GameCollectionsDisplay from "./GameCollectionsDisplay"
import axios from "axios";
import { useAccount } from "../../../Context/useAccount";

export type game = {
    gameId: number;
    bggId: number;
    gameImageUrl: string;
    title: string;
    description: string;
    price: number;
    rating: number;
}

function GameCollectionsLogic() {
    const { id: contextId, jwt: contextJwt } = useAccount();

    const [data, setData] = useState<game[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/game/getGamesByAccount?accountId=${contextId}`, {
                headers: {"Authorization" : `${contextJwt}`}
            })
            .then((Response) => setData(Response.data))
            .catch((error) => console.error(error));
    }, [])

    return (
        <>
            <GameCollectionsDisplay data={data}/>
        </>
    )
}

export default GameCollectionsLogic