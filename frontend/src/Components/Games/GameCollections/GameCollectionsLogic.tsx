import { useEffect, useState } from "react"
import GameCollectionsDisplay from "./GameCollectionsDisplay"

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
    const [data, setData] = useState<game[]>([]);

    useEffect(() => {
        
    }, [])

    return (
        <>
            <GameCollectionsDisplay 
                data={data}
            />
        </>
    )
}

export default GameCollectionsLogic