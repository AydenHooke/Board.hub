import { game } from "./GameCollectionsLogic";

type gameProps = {
    data: game;
}

function GameInfoDisplay({data}: gameProps) {
    return (
        <div className="game-info">
            <h1>{data.title}</h1>
            <img src={data.gameImageUrl} alt={data.title}/>
            <p>Rating:{data.rating} Price:{data.price}</p>
            <p>{data.description}</p>
        </div>
    )
}

export default GameInfoDisplay