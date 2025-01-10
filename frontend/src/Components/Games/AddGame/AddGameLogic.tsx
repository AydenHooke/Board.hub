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