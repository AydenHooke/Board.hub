import axios from 'axios'
import React, { useEffect, useState } from 'react'

function GameLogic() {
  const [state, setState] = useState({
    collection: {} as any
  });

  let xml2js = require('xml2js');

  useEffect(()=>{
    let jString;
    let parser = new xml2js.Parser();
    parser.parseStringPromise(state.collection).then(function (result: any) {
      console.dir(result)
      console.log('Done')
      JSON.stringify(result);
    })

    // let games = state.collection.getElementsByTagName('item');
    // let numberOfGames = state.collection.getElementsByTagName('item').length;
    // let ids:number[] = [];

    // for(let i=0;i<numberOfGames;i++)
    //   ids[i] = games[i].getElementsByTagName('id')[0].innerHTML;

      console.log(jString);
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