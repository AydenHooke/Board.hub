import { Link } from "react-router-dom";

type SignInInputProps = {
    username: string, setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string, setPassword: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: any
}

function SignInInput({
    username, setUsername,
    password, setPassword,
    handleSubmit}: SignInInputProps
) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <label>
                    Username:
                    <input required type="text" value={username} onChange={
                        (e: any) => setUsername(e.target.value)
                    }></input>
                </label>
                <br/>
                <label>
                    Password:
                    <input required type="password" value={password} onChange={
                        (e: any) => setPassword(e.target.value)
                    }></input>
                </label>
                <br/>
                <button type="submit">Sign In</button>
                <br/>
                <Link to="/SignUp">Go to Sign up page.</Link>
            </form>
        </>
    )
}

export default SignInInput