import React from 'react'

function ProfileInput(
    { handleProfileEdit } : { handleProfileEdit: () => void }
) {
  return (
    <>
     <button onClick={handleProfileEdit}>Edit Profile</button>
        <h1>Your Profile</h1>

        <section className='profile-section'>
            <ul className='profile-list'>
                <li>Username: {}</li>
                <li>Email: </li>
                <li>Password:</li>
                <li>Address: </li>
                <li>Role:</li>
            </ul>
        </section>
    </>
  )
}

export default ProfileInput