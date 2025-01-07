import { Account } from "../../Types/Account"
import imageUrl from "../../Images/bat.png"



interface PublicProfileInputProps {
  account: Account;
}

function PublicProfileInput({ account }: PublicProfileInputProps) {

  return (
    <>
      <div >
        <div>
          <div id="profile-page-container">
            <h1>{account.username}&apos;s Profile</h1>
            <img className="circle" src={imageUrl} alt="Blue bat hanging upside down" />
            <h3>BGG Account: {account.bggAccount ? account.bggAccount : "None"}</h3>
            <h3>Role: {account.role ? account.role : "Undefined"}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default PublicProfileInput