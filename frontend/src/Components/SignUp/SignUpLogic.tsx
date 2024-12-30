import { FormEvent, useState } from "react";
import SignUpInput from "./SignUpInput";
import axios from "axios";
import { useAccount } from "../../Context/useAccount";
import {useNavigate} from "react-router-dom"

function SignUpLogic() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setEmail: setContextEmail, setUsername: setContextUsername, setJwt } = useAccount();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        axios
            .post('http://localhost:8080/account/register', {
                email: email,
                username: username,
                passwordHash: password
            })
            .then((response) => {
                console.log(response.data);
                setContextEmail(email);
                setContextUsername(username);
                setJwt(response.data.jwt); // Assuming the JWT is returned in the response data
                navigate("/games")
            })
            .catch((error) => console.error('Error posting data, ', error));
    }

    return (
        <>
            <SignUpInput
                email={email} setEmail={setEmail}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default SignUpLogic;