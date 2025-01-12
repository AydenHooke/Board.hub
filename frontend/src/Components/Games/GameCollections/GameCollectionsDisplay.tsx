import { useEffect, useState } from "react";
import { game } from "./GameCollectionsLogic"
import GameInfoDisplay from "./GameInfoDisplay";

type gameProps = {
  data: game[];
}

function GameCollectionsDisplay({ data }: gameProps) {
  const [filterString, setFilterString] = useState("");
  const [gameClass, setGameClass] = useState("");
  const [checkToggle, setCheckToggle] = useState(false);
  const [gameId, setGameId] = useState(-1);

   
  // Unused and unfinished pagination code.
  /*
  const totalGames: number = data.length;
  const [gameArray, setGameArray] = useState<game[]>(data);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [amount, setAmount] = useState(10);

  function changeState(amount: number) {
    setAmount(amount);
    setTotalPages(Math.ceil(totalGames / amount));
    setPageNumber(1);
  }

  function showGames() {
    let begin: number;
    let end: number;

    if (pageNumber == 1)
      begin = 0;
    else
      begin = ((pageNumber - 1) * amount);

    if (pageNumber == totalPages)
      end = (totalGames - 1);
    else
      end = Number(begin) + Number(amount);

    setGameArray(data.slice(begin, end));
  }
  useEffect(() => {
    showGames();
  }, [amount]);
  useEffect(() => {
    showGames();
  }, [pageNumber]);

  function pageButton() {
    return (
      <>
        {<button onClick={() => { setPageNumber(1); }}>First</button>}
        {<button onClick={() => { if (pageNumber != 1) { setPageNumber(pageNumber - 1); } }}>Prev</button>}
        <span> {pageNumber} of {totalPages} </span>
        {<button onClick={() => { if (pageNumber != totalPages) { setPageNumber(pageNumber + 1); } }}>Next</button>}
        {<button onClick={() => { setPageNumber(totalPages); }}>Last</button>}
      </>
    )
  }*/

  return (
    <>
      <div className={gameClass} onClick={() => {
        if (checkToggle) { setGameId(-1); setCheckToggle(!checkToggle); setGameClass(""); }
      }}>
        <span>Game filter: </span><input onInput={(e) => {
          setFilterString(e.currentTarget.value);
        }} type="text"></input>

        {/*<select value={amount} onChange={
          (e: any) => { changeState(e.target.value); }
        }>
          <option value={totalGames}>Show All</option>
          <option value={100}>Show 100</option>
          <option value={50}>Show 50</option>
          <option value={25}>Show 25</option>
          <option value={10}>Show 10</option>
        </select>
        <br />
        <br />*/}

        <br />
        <ul className="games-list-grid">
          {data
            .sort((game0, game1) => {return game0.title.localeCompare(game1.title); })
            .filter((game) => {return game.title.toLowerCase().includes(filterString); })
            .map((game) => {
              return (
                <li key={game.gameId} className="game-tile">
                  <img src={game.gameImageUrl} alt={game.title} onClick={() => {
                    if (!checkToggle) { setGameId(game.gameId); setCheckToggle(!checkToggle); setGameClass("game-blur"); }
                  }} />
                </li>
              )
            })}
        </ul>
      </div>

      {data.map((game) => {
        return (
          <div key={game.gameId}>
            {(gameId == game.gameId) && <GameInfoDisplay data={game} />}
          </div>
        )
      })}
    </>
  )
}

export default GameCollectionsDisplay