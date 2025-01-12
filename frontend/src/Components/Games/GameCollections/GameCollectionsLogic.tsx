import { useEffect, useState } from "react"
import GameCollectionsDisplay from "./GameCollectionsDisplay"
import axios from "axios";
import { useAccount } from "../../../Context/useAccount";
import { authorizationHander } from "../../Home/Logout";

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
  const { id: contextId, jwt: contextJwt } = useAccount();

  const [data, setData] = useState<game[]>([]);

  useEffect(() => {
    axios
    .get(`http://18.224.45.201:8080/game/getGamesByAccount?accountId=${contextId}`, {
      headers: { "Authorization": `${contextJwt}` }
    })
    .then((Response) => setData(Response.data))
    .catch((error) => {
      console.log(error);
      authorizationHander(error);
    })

    const interval = setInterval(()=> {
      axios
        .get(`http://18.224.45.201:8080/game/getGamesByAccount?accountId=${contextId}`, {
          headers: { "Authorization": `${contextJwt}` }
        })
        .then((Response) => setData(Response.data))
        .catch((error) => {
          console.log(error);
          authorizationHander(error);
        })},  1000) 
  }, [])

  return (
    <>
      <GameCollectionsDisplay data={data} />
    </>
  )
}

export default GameCollectionsLogic