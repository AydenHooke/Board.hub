import React from 'react'

type ProfileInputProps = {
    email: string, setEmail: React.Dispatch<React.SetStateAction<string>>,
    username: string, setUsername: React.Dispatch<React.SetStateAction<string>>,
    password: string, setPassword: React.Dispatch<React.SetStateAction<string>>,
    bggUsername: string, setBggUsername: React.Dispatch<React.SetStateAction<string>>,
    handleProfileEdit: (e: React.FormEvent<HTMLFormElement>) => void
};

function ProfileInput({
  email, setEmail,
  username, setUsername,
  password, setPassword,
  bggUsername, setBggUsername,
  handleProfileEdit}: ProfileInputProps
) {
  return (
    <>
     
        <h1>Your Profile</h1>

        <section className='profile-section'>
          <form className="profile-form" onSubmit={handleProfileEdit}>
                  <h2>Edit Profile</h2>
                  <label>
                    Email
                      <input required type="email" placeholder="Change Email" value={email} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label>
                      Username
                      <input required type="text" placeholder="Enter Username" value={username} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label>
                      Bgg Username
                      <input required type="text" placeholder="Enter BGG Username" value={bggUsername} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setBggUsername(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label>
                      Password
                      <input required type="password" placeholder="Enter Password" value={password} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
                      }></input>
                  </label>
                  <br />
                  <button type="submit">Save Changes</button>
          </form>
        </section>
    </>
  )
}

export default ProfileInput