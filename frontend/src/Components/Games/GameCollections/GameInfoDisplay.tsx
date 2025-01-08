import axios from "axios";
import { useAccount } from "../../../Context/useAccount";
import { game } from "./GameCollectionsLogic";
import { useEffect, useState } from "react";

type gameProps = {
  data: game;
}

function GameInfoDisplay({ data }: gameProps) {
  const { id: contextId, jwt: contextJwt } = useAccount();

  const [status, setStatus] = useState(-1);

  useEffect(() => {
    /*
    if (contextId != '') {
        axios
        .get(`http://localhost:8080/game/CheckGameOwnership`, {
            headers: {"Authorization" : `${contextJwt}`}
        })
        .then((Response) => setStatus(Response.status))
        .catch((error) => console.error(error));
    }
    */
  }, [])

  function handleSubmitAdd(event: any) {
    event.preventDefault();

    /*
    axios
        .post(`http://localhost:8080/game/persistOrCollectOneGame`, {

        }, {
            headers: {"Authorization" : `${contextJwt}`}
        })
        .then((Response) => console.log(Response))
        .catch((error) => console.error(error));
    */
  }

  function handleSubmitRemove(event: any) {
    event.preventDefault();

    /*
    axios
        .post(`http://localhost:8080/game/persistOrCollectOneGame`, {

        }, {
            headers: {"Authorization" : `${contextJwt}`}
        })
        .then((Response) => console.log(Response))
        .catch((error) => console.error(error));
    */
  }

  function escapeRegExp(string: String) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  function replaceAll(str: String, find: any, replace: any) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
  var desc = data.description;
  desc = replaceAll(desc, '&amp;', '&');
  desc = replaceAll(desc, '&#10;&#10;', ' ');
  desc = replaceAll(desc, '&#10;', '');
  desc = replaceAll(desc, '&quot;', '"');
  desc = replaceAll(desc, '&rsquo;', "'");
  desc = replaceAll(desc, '&mdash;', '-');
  desc = replaceAll(desc, '&hellip;', '…');
  desc = replaceAll(desc, '&nbsp;', ' ');
  desc = replaceAll(desc, '&bull;', '•');

  return (
    <div className="game-info">
      <h1 style={{ display: "inline" }}>{data.title}</h1>

      {((contextId != '') && (status == 204)) && <button style={{ float: "right" }} onClick={handleSubmitAdd}>Add Game to your Collection</button>}
      {((contextId != '') && (status == 200)) && <button style={{ float: "right" }} onClick={handleSubmitRemove}>Remove Game from your Collection</button>}
      <br />

      <img src={data.gameImageUrl} alt={data.title} />
      <p>Rating: {data.rating} </p>
      <p>Price:{data.price}</p>
      <p>{desc}</p>
    </div>
  )
}

export default GameInfoDisplay