import axios from 'axios'
import React, { useEffect, useState } from 'react'

function GameLogic() {
  const [state, setState] = useState({
    collection: {} as any
  });

  useEffect(()=>{
    let parser, xmlDoc;
    
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(state.collection as string, "text/html")

    let games = xmlDoc.getElementsByTagName('item');
    let numberOfGames = xmlDoc.getElementsByTagName('item').length;

    let ids = [];
    //console.log(games);
    for(let i=0;i<numberOfGames;i++)
      ids[i] = games[i].attributes[1].nodeValue;
    //  ids[i] = games[i].getElementsByTagName('name')[0].innerHTML;
    //console.log(games[0].innerHTML)
    console.log(ids);
  }, [state])
  

  let username = "Drsen57";


    async function handleGetGameCollection() {
        let myCollection = await axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&subtype=boardgame&own=1`)
        const collectionData = myCollection.data;
        //console.log(myCollection.headers); it automatically parses it as xml
        setState(()=>({collection:collectionData}));
        
    }

  return (
    <>
        <button onClick={handleGetGameCollection}>
            Get Game Collection From BGG
        </button>
    </>
  )
}

export default GameLogic