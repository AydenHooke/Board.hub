import { FormEvent, useState } from "react"
import SignUpInput from "./SignUpInput"

function SignUpLogic() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        console.log(email);
        console.log(username);
        console.log(password);
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