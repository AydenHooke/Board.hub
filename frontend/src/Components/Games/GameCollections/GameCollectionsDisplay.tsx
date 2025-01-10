import { useEffect, useState } from "react";
import { game } from "./GameCollectionsLogic"
import GameInfoDisplay from "./GameInfoDisplay";

type gameProps = {
  data: game[];
}

function GameCollectionsDisplay({data}: gameProps) {
  const [filterString, setFilterString] = useState("");
  const [gameClass, setGameClass] = useState("");
  const [checkToggle, setCheckToggle] = useState(false);
  const [gameId, setGameId] = useState(-1);

  const totalGames: number = data.length;
  const [gameArray, setGameArray] = useState<game[]>(data);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [amount, setAmount] = useState(totalGames);

  console.log(data);

  useEffect(() => {
    
  }, [])

  function changeState(amount: number) {
    console.log(amount);
    setAmount(amount);
    setTotalPages(Math.ceil(totalGames / amount));
    setPageNumber(1);

    showGames();
  }

  function showGames() {
    let begin: number;
    let end: number;

    if (pageNumber == 1) begin = 0;
    else begin = ((pageNumber - 1) * amount);

    if (pageNumber == totalPages) end = (totalGames - 1);
    else end = (begin + (amount - 1));

    setGameArray(data.slice(begin, end));
  }

  function pageButton() {
    return (
      <>
        {<button onClick={() => {setPageNumber(1); showGames();}}>First</button>}
        {<button onClick={() => {if (pageNumber != 1) {setPageNumber(pageNumber - 1); showGames();}}}>Prev</button>}
        <span> {pageNumber} of {totalPages} </span>
        {<button onClick={() => {if (pageNumber != totalPages) {setPageNumber(pageNumber + 1); showGames();}}}>Next</button>}
        {<button onClick={() => {setPageNumber(totalPages); showGames();}}>Last</button>}
      </>
    )
  }

  return (
    <>
      <div className={gameClass} onClick={() => {
        if (checkToggle) {setGameId(-1); setCheckToggle(!checkToggle); setGameClass("");}
      }}>
        <span>Game filter: </span><input onInput={(e)=>{
          setFilterString(e.currentTarget.value);
        }} type="text"></input>

        <select value={amount} onChange={
          (e: any) => {changeState(e.target.value);}
        }>
          <option value={totalGames}>Show All</option>
          <option value={100}>Show 100</option>
          <option value={50}>Show 50</option>
          <option value={25}>Show 25</option>
          <option value={10}>Show 10</option>
        </select>
        <br/>
        <br/>

        {pageButton()}

        <br/>
        <ul className="games-list-grid">
          {gameArray
            /*.sort((game0, game1) => {return game0.title.localeCompare(game1.title); })
            .filter((game) => {return game.title.toLowerCase().includes(filterString); })*/
            .map((game) => {
              return (
                <li key={game.gameId} className="game-tile">
                  <img src={game.gameImageUrl} alt={game.title} onClick={() => {
                      if (!checkToggle) {setGameId(game.gameId); setCheckToggle(!checkToggle); setGameClass("game-blur");}
                  }}/>
                </li>
              )
          })}
        </ul>
      </div>

      {pageButton()}

      {gameArray.map((game) => {
        return (
          <div key={game.gameId}>
            {(gameId == game.gameId) && <GameInfoDisplay data={game}/>}
          </div>
        )
      })}
    </>
  )
}

export default GameCollectionsDisplay