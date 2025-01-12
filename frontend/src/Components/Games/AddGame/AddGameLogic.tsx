import { FormEvent, useState } from "react"
import { useAccount } from "../../../Context/useAccount";
import AddGameInput from "./AddGameInput"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddGameLogic() {
    const { id: contextId, jwt: contextJwt } = useAccount();
    const navigate = useNavigate();

    const [bggId, setBggId] = useState({} as number);
    const [gameImageUrl, setGameImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [pending, setPending] = useState(true);
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    function addCustomGame() {
        axios
            .post(`http://18.224.45.201:8080/game/persistOrCollectOneGame?id=${contextId}`, {
                bggId: -1,
                gameImageUrl: gameImageUrl,
                title: title,
                description: description
            }, {
                headers: {"Authorization" : `${contextJwt}`}
            })
            .then((Response) => {console.log(Response); setPending(true); setSuccess(true);})
            .catch((error) => {console.error(error); setPending(true); setFail(true);});
    }

    function addBGGgame() {
        try {
            grabBggInfo(bggId as unknown as string);
        } catch (error) {
            console.log("An invalid BGG game was attempted to be added")
        }
        
    }

    async function grabBggInfo(gamesToAdd: string) {
        let newGameEntries = await axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gamesToAdd}`);
  
        let parser, xmlDoc;
  
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(newGameEntries.data as string, "text/html")
  
        let games = xmlDoc.getElementsByTagName('item');
        let numberOfGames = xmlDoc.getElementsByTagName('item').length;
  
        let allGames: any[] | undefined = [];
        //console.log(games);
        for(let i=0;i<numberOfGames;i++){
          allGames[i] ={bggId: games[i].attributes[1].nodeValue, // gathers the bggId
                        gameImageUrl: games[i].getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue,
                        title: games[i].getElementsByTagName("name")[0].attributes[2].nodeValue,
                        description: games[i].getElementsByTagName("description")[0].childNodes[0].nodeValue
        }
      }
      console.log("Serving these games to the server:")
      console.log(allGames);
      //console.log(allGames)
        async function logTheGames() {
          await axios.post(`http://18.224.45.201:8080/game/persistAndCollectManyGames?id=${contextId}`,allGames, {headers: {Authorization: `${contextJwt}`}})
        }
        logTheGames();
      console.log("All games have been created (hopefully)")
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setPending(false);
        setSuccess(false);
        setFail(false);

        if (!isChecked) {
            addCustomGame();
        } else {
            addBGGgame();
        }
    }

    return (
        <>
            <button onClick={() => navigate("/games")}>Back</button>
            <AddGameInput
                bggId={bggId} setBggId={setBggId}
                gameImageUrl={gameImageUrl} setGameImageUrl={setGameImageUrl}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                isChecked={isChecked} setIsChecked={setIsChecked}
                pending={pending}
                success={success}
                fail={fail}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default AddGameLogic