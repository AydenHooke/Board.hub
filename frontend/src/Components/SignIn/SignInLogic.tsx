import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInInput from "./SignInInput";
import axios from "axios";
import { useAccount } from "../../Context/useAccount";


function SignInLogic() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { username: contextUsername, 
            setUsername: setContextUsername, 
            setEmail: setContextEmail,
            setId: setContextId,
    } = useAccount();
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        axios
            .post('http://localhost:8080/account/login', {
                username: username,
                passwordHash: password
            })
            .then((Response) => {
                console.log(Response.data)

                setContextUsername(Response.data.username);
                setContextEmail(Response.data.email);
                setContextId(Response.data.accountId);

                console.log("Context username:", contextUsername); // Print the context email
                navigate("/games")
            })
            .catch((error) => console.error('Error posting data, ', error));
    }

    return (
        <>
            <SignInInput
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        </>
    )
}

export default SignInLogic