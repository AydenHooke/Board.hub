import { useEffect, useState } from "react";
import { game } from "../Games/GameCollections/GameCollectionsLogic"
import axios from "axios";

function Home() {
  const [data, setData] = useState<game[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/game/getAllGames`)
      .then((Response) => setData(Response.data))
      .catch((error) => console.error(error));
  }, [])

  return (
    <>
      <h1>Welcome To Board.up</h1>

      <p>Board up is a website for talking about and rating board games. Check out our list of games, our forum discussions, and gaming events!</p>
    </>
  )
}

export default Home