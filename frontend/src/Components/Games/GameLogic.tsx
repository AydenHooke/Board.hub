import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAccount } from '../../Context/useAccount';

function GameLogic() {
  const {id, jwt : contextJwt, bggUsername} = useAccount();

  const [state, setState] = useState({
    collection: {} as any,
    unpersistedIds: {} as any,
  });

  useEffect(()=>{
    console.log(bggUsername);
    if(JSON.stringify(state.collection).length > 2){//so that this doesn't run when nothing is there
      console.log("") // blank space to keep logs together

      let parser, xmlDoc;
  
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(state.collection as string, "text/html")

      let games = xmlDoc.getElementsByTagName('item');
      let numberOfGames = xmlDoc.getElementsByTagName('item').length;

      let ids = [];
      //console.log(games);
      for(let i=0;i<numberOfGames;i++)
        ids[i] = games[i].attributes[1].nodeValue; //attribute[1] specifically refers to the node that contains the game id
      console.log("Collection comprised of:")
      console.log(ids);
      console.log("rectifying collection...");

      const getUnpersisted = async () =>{
        let importIdsFromBgg = await rectifyGameCollection(ids); //this is a JSON object full of Ids that are not in board.up's database yet
        if(importIdsFromBgg.length!=0){ // this just sees if there is any changes
          setState(()=>({
            ...state,
            unpersistedIds:importIdsFromBgg}));
          }
          else(
            console.log("No rectification needed!")
          )
      }
      
      getUnpersisted();
    }
  }, [state.collection])

  useEffect(()=>{
    if(JSON.stringify(state.unpersistedIds).length > 2){//so that this doesn't run when nothing is there
      let gamesToAdd = state.unpersistedIds;
      let gameQueryString = "";
      console.log("Collection is missing the following games:")
      console.log(gamesToAdd);
      let timeoutPeriod = 0;
      while(gamesToAdd.length > 0){
        //console.log("while loop ran!")
        for(let i = 1; i<=20 && gamesToAdd.length > 0; i++){
          // console.log("for loop ran!")
          gameQueryString = gameQueryString.concat(gamesToAdd[0] + ",");
          //console.log(gameQueryString);
          gamesToAdd.splice(0,1);
          // this manuevers the list of ids and splits by 20 to not be limited by BGG api
        }
        gameQueryString = gameQueryString.slice(0, -1); // this cuts off the last comma, because otherwise it will count as 21 items, which bgg cannot return
        //console.log(gameQueryString);
        setTimeout(grabBggInfo, timeoutPeriod, gameQueryString)
        timeoutPeriod += 5001; // waits 5 extra seconds every time this is run
        //console.log("while loop finished!")
        gameQueryString = "";
      }
  }
  }, [state.unpersistedIds])
  
  let username = bggUsername;
  //let username = "Drsen57"; // this later will be the user's username of course
  //let username = "Alan How"; // this is a BGG user with over 8k games. 35 minutes to populate, use with caution
  //let username = "Trogdor64"; // this is a buddy of Ayden's with 161 games
  //let username = "dmonty"; // this is a buddy of Ayden's from Dice Tower with 916 games. One game throws an error for a set of 20 without known reason (maybe missing metadata from XML - likely BGG issue)

    async function handleGetGameCollection() {
      if(bggUsername != null){
        let myCollection;
        myCollection = await axios.get(`https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&subtype=boardgame&own=1`)

          if(myCollection.status == 202){
            handleGetGameCollection();
            }
            else{
        //when you query BGG, it gives you a 202 while your log file is being created
        //this while loop waits 5 seconds and tries again until it sees the 200
        const collectionData = myCollection.data;
        //console.log(myCollection.headers); it automatically parses it as xml
        setState(()=>({
          ...state,
          collection:collectionData}));
        }}
        else{
          alert("Add your BGG account information to access this feature"); // or whatever alert we end up using
        }

          
    }

    async function rectifyGameCollection(ids: any) {
      let collectionResults = await axios.post(`http://18.224.45.201:8080/game/validateGamePersistenceAndCollect?id=${id}`, ids, {headers: {Authorization: `${contextJwt}`}})
      let collectionData = collectionResults.data;
        if(collectionResults.status == 200)
          return collectionData;
        
    }

    async function grabBggInfo(gamesToAdd: string) {
      let newGameEntries = await axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gamesToAdd}`);

      let parser, xmlDoc;
    
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(newGameEntries.data as string, "text/html")
  
      let games = xmlDoc.getElementsByTagName('item');
      let numberOfGames = xmlDoc.getElementsByTagName('item').length;
  
      let allGames: any[] | undefined = [];
      //console.log(games);
      for(let i=0;i<numberOfGames;i++){
        allGames[i] ={bggId: games[i].attributes[1].nodeValue, // gathers the bggId
                      gameImageUrl: games[i].getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue,
                      title: games[i].getElementsByTagName("name")[0].attributes[2].nodeValue,
                      description: games[i].getElementsByTagName("description")[0].childNodes[0].nodeValue           
      } 
    }
    console.log("Serving these games to the server:")
    console.log(allGames);
    //console.log(allGames)
      async function logTheGames() {
        await axios.post(`http://18.224.45.201:8080/game/persistAndCollectManyGames?id=${id}`,allGames, {headers: {Authorization: `${contextJwt}`}})
      }
      logTheGames();
    console.log("All games have been created (hopefully)")
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