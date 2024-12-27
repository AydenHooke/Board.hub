import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInInput from "./SignInInput";
import axios from "axios";

function SignInLogic() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        axios
            .post('localhost:8080/account/login', {
                username: username,
                password: password
            })
            .then((Response) => console.log(Response.data))
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