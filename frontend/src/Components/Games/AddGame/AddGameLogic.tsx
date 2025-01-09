import { FormEvent, useState } from "react"
import { useAccount } from "../../../Context/useAccount";
import AddGameInput from "./AddGameInput"
import axios from "axios";

function AddGameLogic() {
    const { id: contextId, jwt: contextJwt } = useAccount();

    const [bggId, setBggId] = useState({} as number);
    const [gameImageUrl, setGameImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [pending, setPending] = useState(true);

    function addCustomGame() {
        axios
            .post(`http://localhost:8080/game/persistOrCollectOneGame?id=${contextId}`, {
                bggId: -1,
                gameImageUrl: gameImageUrl,
                title: title,
                description: description
            }, {
                headers: {"Authorization" : `${contextJwt}`}
            })
            .then((Response) => {console.log(Response); setPending(true);})
            .catch((error) => {console.error(error); setPending(true);});
    }

    function addBGGgame() {
        
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setPending(false);

        if (!isChecked) {
            addCustomGame();
        } else {
            addBGGgame();
        }
    }

    return (
        <>
            <AddGameInput 
                bggId={bggId} setBggId={setBggId}
                gameImageUrl={gameImageUrl} setGameImageUrl={setGameImageUrl}
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                isChecked={isChecked} setIsChecked={setIsChecked}
                pending={pending}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default AddGameLogic