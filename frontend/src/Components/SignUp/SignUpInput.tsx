import { Link } from "react-router-dom";
import Image from "../../Images//logo.png";

type SignUpInputProps = {
    email: string, setEmail: React.Dispatch<React.SetStateAction<string>>,
    username: string, setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string, setPassword: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
};

function SignUpInput({
    email, setEmail,
    username, setUsername,
    password, setPassword,
    handleSubmit}: SignUpInputProps
) {
    return (
        <>
            <h2 className="heading-center">Rate and Talk About Board Games Today!</h2>
            <div className={"sign-up-img-form"}>
                <img style={{width:"30vw"}} src={Image} alt="Chess Board Icon" />
                <form className="sign-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <label>
                        <input required type="email" placeholder="Enter Email" value={email} onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
                        }></input>
                    </label>
                    <br/>
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
                    <button className="default-button" type="submit">Sign Up</button>
                    <br/>
                    <Link to="/SignIn">Go to Sign in page.</Link>
                </form>
            </div>
        </>
    )
}

export default SignUpInput