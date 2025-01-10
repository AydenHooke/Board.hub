import { FormEvent, useEffect, useState } from 'react'
import ProfileInput from './ProfileInput'
import axios from 'axios'
import { useAccount } from '../../Context/useAccount';
import { authorizationHander } from '../Home/Logout';

function ProfileLogic() {

    const { username: contextUsername, setUsername: setContextUsername,
            email: contextEmail, setEmail: setContextEmail,
            id: contextId, setId: setContextId,
            bggUsername: contextBggUsername, setBggUsername: setContextBggUsername,
            jwt: contextJwt, setJwt: setContextJwt
    } = useAccount();

    const [email, setEmail] = useState(contextEmail);
    const [username, setUsername] = useState(contextUsername);
    const [password, setPassword] = useState("");
    const [bggUsername, setBggUsername] = useState(contextBggUsername);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log(contextJwt);
    }, [contextJwt])


    function handleProfileEdit(e: FormEvent){
      e.preventDefault();

      axios.patch(`http://localhost:8080/account/`, {
          accountId: contextId,
          email: email,
          username: username,
          passwordHash: password,
          bggAccount: bggUsername
      }, {
          headers: {
            'Authorization': `${contextJwt}`
          }
      })
      .then(response => {
          console.log(response.data);
          const token = response.headers['Authorization']; // Extract the token from the headers
          if (token) {
              setContextJwt(token);
          }
          setContextEmail(response.data.email);
          setContextUsername(response.data.username);
          setContextId(response.data.accountId);
          setContextBggUsername(bggUsername);

          // Show success message
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000);
      })
      .catch(error => {
        console.error('Error patching data, ', error);
        authorizationHander(error);
      });

    };

  return (
    <div>
       <ProfileInput
        email={email} setEmail={setEmail}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        bggUsername={bggUsername} setBggUsername={setBggUsername}
        handleProfileEdit={handleProfileEdit}
        showSuccessMessage={showSuccessMessage}/>
    </div>
  )
}

export default ProfileLogic