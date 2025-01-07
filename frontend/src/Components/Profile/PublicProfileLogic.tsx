import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { Account } from "../../Types/Account";
import PublicProfileInput from "./PublicProfileInput";


function PublicProfileLogic() {

  const { userId } = useParams<{ userId: string }>();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    async function getUser(userId: string) {
      console.log(userId);
      axios.get(`http://localhost:8080/account/${userId}`)
      .then(response => {
        console.log(response.data);
        setAccount(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
    if (userId) {
      getUser(userId);
    }
  }, [userId])

  return (
    <>
      {account && (<PublicProfileInput account={account} />)}
    </>
  )
}

export default PublicProfileLogic