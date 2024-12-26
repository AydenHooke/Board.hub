import { Link } from "react-router-dom";

type SignUpInputProps = {
    email: string, setEmail: React.Dispatch<React.SetStateAction<string>>,
    username: string, setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string, setPassword: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: any
};

function SignUpInput({
    email, setEmail,
    username, setUsername,
    password, setPassword,
    handleSubmit}: SignUpInputProps
) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>
                    Email:
                    <input required type="email" value={email} onChange={
                        (e: any) => setEmail(e.target.value)
                    }></input>
                </label>
                <br/>
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
                <button type="submit">Sign Up</button>
                <br/>
                <Link to="/SignIn">Go to Sign in page.</Link>
            </form>
        </>
    )
}

export default SignUpInput