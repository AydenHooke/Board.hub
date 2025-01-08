import axios from "axios";
import { useAccount } from "../../../Context/useAccount";
import { game } from "./GameCollectionsLogic";
import { useEffect, useState } from "react";

type gameProps = {
    data: game;
}

function GameInfoDisplay({data}: gameProps) {
    const { id: contextId, jwt: contextJwt } = useAccount();

    const [status, setStatus] = useState(-1);
    const [change, setChange] = useState(true);

    useEffect(() => {
      console.log(data.gameId);
      console.log(contextId);
      if (contextId != '') {
          axios
          .get(`http://localhost:8080/game/checkGameOwnership?gameId=${data.gameId}&accountId=${contextId}`, {
              headers: {"Authorization" : `${contextJwt}`}
          })
          .then((Response) => setStatus(Response.status))
          .catch((error) => console.error(error));
      }
    }, [change])

    function handleSubmitAdd(event: any) {
      event.preventDefault();
    
      axios
          .post(`http://localhost:8080/game/persistOrCollectOneGame?id=${contextId}`, {
              gameId: data.gameId,
              bggId: data.bggId,
              gameImageUrl: data.gameImageUrl,
              title: data.title,
              description: data.description,
              price: data.price,
              rating: data.rating
          }, {
              headers: {"Authorization" : `${contextJwt}`}
          })
          .then((Response) => {console.log(Response); setStatus(-1); setChange(!change);})
          .catch((error) => console.error(error));
    }

    function handleSubmitRemove(event: any) {
      event.preventDefault();
      
      axios
          .delete(`http://localhost:8080/game/removeGameOwnership?gameId=${data.gameId}&accountId=${contextId}`, {
              headers: {"Authorization" : `${contextJwt}`}
          })
          .then((Response) => {console.log(Response); setStatus(-1); setChange(!change);})
          .catch((error) => console.error(error));
    }

    return (
      <div className="game-info">
          <h1 style={{display: "inline"}}>{data.title}</h1>

          {((contextId != '') && (status == 204)) && <button style={{float: "right"}} onClick={handleSubmitAdd}>Add Game to your Collection</button>}
          {((contextId != '') && (status == 200)) && <button style={{float: "right"}} onClick={handleSubmitRemove}>Remove Game from your Collection</button>}
          <br/>

          <img src={data.gameImageUrl} alt={data.title}/>
          <p>Rating:{data.rating} Price:{data.price}</p>
          <p>{data.description}</p>
      </div>
    )
}

export default GameInfoDisplay