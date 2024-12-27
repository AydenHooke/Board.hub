import { Link } from "react-router-dom";

type SignInInputProps = {
    username: string, setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string, setPassword: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function SignInInput({
    username, setUsername,
    password, setPassword,
    handleSubmit}: SignInInputProps
) {
    return (
        <>
            <form className="sign-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <label>
                   
                    <input required type="text" placeholder="Enter Username" value={username} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
                    }></input>
                </label>
                <br/>
                <label>
                    
                    <input required type="password" placeholder="Enter Password" value={password} onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
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