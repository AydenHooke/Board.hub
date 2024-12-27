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
      ids[i] = games[i].attributes[1].nodeValue; //attribute[1] specifically refers to the node that contains the game id

    console.log(ids);

    let importIdsFromBgg = rectifyGameCollection(ids); //this is a JSON object full of Ids that are not in board.up's database yet
    console.log(importIdsFromBgg);

  }, [state])
  

  let username = "Drsen57";


    async function handleGetGameCollection() {
        let myCollection;
        myCollection = await axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&subtype=boardgame&own=1`)

          while(myCollection.status == 202){
            setTimeout(async()=>{
              myCollection = await axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&subtype=boardgame&own=1`)},5500);
            }

        const collectionData = myCollection.data;
        //console.log(myCollection.headers); it automatically parses it as xml
        setState(()=>({collection:collectionData}));
    }

    async function rectifyGameCollection(ids: any) {
      let collectionResults = await axios.post(`https://localhost:8080/validateGamePersistence`,{ids})
      let collectionData = collectionResults.data;
        if(collectionResults.status == 200)
          return collectionData;
        
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