import { FormEvent, useState } from "react"
import SignUpInput from "./SignUpInput"
import axios from "axios";

function SignUpLogic() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        axios
            .post('localhost:8080/account/register', {
                email: email,
                username: username,
                password: password
            })
            .then((Response) => console.log(Response.data))
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
    )
}

export default SignUpLogic