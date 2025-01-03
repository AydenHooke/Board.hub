import axios from 'axios'
import React from 'react'

function Games() {



  


















  async function findAGame(itemToSearch: String){
    let returnedGames = await axios.get(`https://boardgamegeek.com/xmlapi2/search?exact=1&query=${itemToSearch}`)
  } 



  return (
    <div>
        <h1>My Games</h1>//add something like "is this the game you mean?"
    </div>
  )
}

export default Games