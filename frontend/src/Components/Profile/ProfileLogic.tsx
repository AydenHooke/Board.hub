import React, { useEffect } from 'react'
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

    function handleProfileEdit() {
        console.log('Profile edit button clicked')
    }

  return (
    <div>
       <ProfileInput handleProfileEdit={handleProfileEdit}/>
    </div>
  )
}

export default ProfileLogic