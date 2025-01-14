import axios from "axios";
import { useAccount } from "../../../Context/useAccount";
import { game } from "./GameCollectionsLogic";
import { useEffect, useState } from "react";

type gameProps = {
  data: game,
  setGameClass: React.Dispatch<React.SetStateAction<string>>
}

  function GameInfoDisplay({ data, setGameClass }: gameProps) {
  const { id: contextId, jwt: contextJwt } = useAccount();

  const [vote, setVote] = useState(0);
  const [voteStatus, setVoteStatus] = useState(-2);
  const [status, setStatus] = useState(-1);
  const [change, setChange] = useState(true);

  useEffect(() => {
    if (contextId != '') {
      axios
        .get(`http://18.224.45.201:8080/game/checkGameOwnership?gameId=${data.gameId}&accountId=${contextId}`, {
          headers: { "Authorization": `${contextJwt}` }
        })
        .then((Response) => setStatus(Response.status))
        .catch((error) => console.error(error));

      axios
        .get(`http://18.224.45.201:8080/gameVote/account/${contextId}/${data.gameId}`)
        .then((Response) => setVoteStatus(Response.data))
        .catch((error) => console.error(error));
    }

    axios
      .get(`http://18.224.45.201:8080/gameVote/game/${data.gameId}`)
      .then((Response) => setVote(Response.data))
      .catch((error) => console.error(error));
  }, [change])

  function handleSubmitAdd(event: any) {
    event.preventDefault();

    axios
      .post(`http://18.224.45.201:8080/game/persistOrCollectOneGame?id=${contextId}`, {
        gameId: data.gameId,
        bggId: data.bggId,
        gameImageUrl: data.gameImageUrl,
        title: data.title,
        description: data.description,
        price: data.price,
        rating: data.rating
      }, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response); setStatus(-1); setChange(!change); })
      .catch((error) => console.error(error));
  }

  function handleSubmitRemove(event: any) {
    event.preventDefault();

    setGameClass("");

    axios
      .delete(`http://18.224.45.201:8080/game/removeGameOwnership?gameId=${data.gameId}&accountId=${contextId}`, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response); setStatus(-1); setChange(!change); })
      .catch((error) => console.error(error));
  }

  function GameVoteSubmit(sentVote: number) {

    if (voteStatus == 1 && sentVote == 1) sentVote = 0;
    if (voteStatus == -1 && sentVote == -1) sentVote = 0;

    console.log(sentVote);

    axios
      .post(`http://18.224.45.201:8080/gameVote/vote`, {
        game: {gameId: data.gameId},
        account: {accountId: contextId},
        value: sentVote
      }, {
        headers: { "Authorization": `${contextJwt}` }
      })
      .then((Response) => { console.log(Response); setVoteStatus(-2); setChange(!change);})
      .catch((error) => console.error(error));
  }

  var decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities(str : any) {
      if (str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }

      return str;
    }

    return decodeHTMLEntities;
  })();
  var desc = decodeEntities(data.description);

  return (
    <div className="game-info">
      
      <section className="game-info-section">
        <h1 style={{ display: "inline" }}>{data.title}</h1>


        <img src={data.gameImageUrl} alt={data.title} />
        <br />
          {((contextId != '') && (status == 204)) && <button style={{ float: "right" }} onClick={handleSubmitAdd}>Add Game to your Collection</button>}
          {((contextId != '') && (status == 200)) && <button style={{ float: "right" }} onClick={handleSubmitRemove}>Remove Game from your Collection</button>}
        <br />

        <p>Votes: {vote}</p>
        <div className="rating-buttons" >
          {(contextId != '') && <button style={{margin: "4px"}} onClick={() => {if (voteStatus != -2) GameVoteSubmit(1);}}>Like Game</button>}
          {(contextId != '') && <button style={{margin: "4px"}} onClick={() => {if (voteStatus != -2) GameVoteSubmit(-1);}}>Dislike Game</button>}
        </div>

        <p>{desc}</p>
      </section>
    </div>
  )
}

export default GameInfoDisplay