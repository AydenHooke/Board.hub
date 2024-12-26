import { FormEvent, useState } from "react";
import SignInInput from "./SignInInput";

function SignInLogic() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        console.log(username);
        console.log(password);
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