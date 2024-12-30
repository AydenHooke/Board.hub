import React, { FormEvent, useEffect, useState } from 'react'
import ProfileInput from './ProfileInput'
import axios from 'axios'

function ProfileLogic() {

    useEffect(() => {
        async function getProfileData() {
            // would need to get the user's profile data from the backend
            //or alternately use usecontext when logging in
            
            ///axios.get('http://localhost:4000/profile')
        }
    }, [])

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   

function handleProfileEdit(e: FormEvent){
  e.preventDefault();

};


  return (
    <div>
       <ProfileInput 
        email={email} setEmail={setEmail}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        handleProfileEdit={handleProfileEdit}/>
    </div>
  )
}

export default ProfileLogic