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
     
        <h1 id='profile-heading'>Edit Profile</h1>

        <section className='profile-section'>
          <form id="profile-form" onSubmit={handleProfileEdit}>
                  <label className='profile-field'>
                      <b>Email:</b>
                      <input required type="email" className="profile-field-input" placeholder="Change Email" value={email} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label className="profile-field">
                      <b>Username:</b>
                      <input required type="text" className="profile-field-input" placeholder="Enter Username" value={username} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label className='profile-field'>
                      <b>BGG Username:</b>
                      <input required type="text" className="profile-field-input" placeholder="Enter BGG Username" value={bggUsername} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setBggUsername(e.target.value)
                      }></input>
                  </label>
                  <br/>
                  <label className="profile-field">
                      <b>Password:</b>
                      <input required type="password" className="profile-field-input" placeholder="Enter Password" value={password} onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
                      }></input>
                  </label>
                  <br />
                  <button className="default-button" id="profile-button" type="submit">Save Changes</button>
          </form>
        </section>
    </>
  )
}

export default ProfileInput