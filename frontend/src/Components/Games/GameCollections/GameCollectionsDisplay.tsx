import { game } from "./GameCollectionsLogic"

type gameProps = {
    data: game[];
}

function GameCollectionsDisplay({
    data}: gameProps
) {
    return (
        <ul>
            {data.map((game) => {
                return (
                    <li>
                        
                    </li>
                )
            })}
        </ul>
    )
}

export default GameCollectionsDisplay