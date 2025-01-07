import { game } from "./GameCollectionsLogic"

type gameProps = {
    data: game[];
}

function GameCollectionsDisplay({
    data}: gameProps
) {
    return (
        <ul className="games-list-grid">
            {data.map((game) => {
                return (
                    <li key={game.gameId} className="game-tile">
                        <img src={game.gameImageUrl} alt={game.title}/>
                    </li>
                )
            })}
        </ul>
    )
}

export default GameCollectionsDisplay