import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInInput from "./SignInInput";
import axios from "axios";
import { useAccount } from "../../Context/useAccount";


function SignInLogic() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUsername: setContextUsername, 
            setEmail: setContextEmail,
            setId: setContextId,
            setJwt: setContextJwt,
    } = useAccount();
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        axios.post('http://localhost:8080/account/login', {
                username: username,
                passwordHash: password
            })
            .then((response) => {
                console.log(response.data)
                console.log(response.headers)
                const token = response.headers['authorization']; // Try both cases
                console.log(token);
                if (token) {
                   setContextJwt(token);
                }
                setContextUsername(response.data.username);
                setContextEmail(response.data.email);
                setContextId(response.data.accountId);
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