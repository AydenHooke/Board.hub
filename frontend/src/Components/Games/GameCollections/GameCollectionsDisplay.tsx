import { useState } from "react";
import { game } from "./GameCollectionsLogic"

type gameProps = {
  data: game[];
}

function GameCollectionsDisplay({
  data }: gameProps
) {

  const [filterString, setFilterString] = useState("");

  return (
    <>
      <span>Game filter: </span><input onInput={(e)=>{
        setFilterString(e.currentTarget.value);
      }} type="text"></input>

      <ul className="games-list-grid">
        {
          data
            .sort((game0, game1) => {return game0.title.localeCompare(game1.title); })
            .filter((game) => {return game.title.toLowerCase().includes(filterString); })
            .map((game) => {
            return (
              <li key={game.gameId} className="game-tile">
                <img src={game.gameImageUrl} alt={game.title} />
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default GameCollectionsDisplay