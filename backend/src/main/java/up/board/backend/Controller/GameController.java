package up.board.backend.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Game;
import up.board.backend.Entity.GameCollection;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameCollectionService;
import up.board.backend.Service.GameService;
import up.board.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:5174")
public class GameController {

  private static final Logger logger = LoggerFactory.getLogger(GameController.class);

  AccountService accountService;
  GameService gameService;
  GameCollectionService gameCollectionService;
  JwtUtil jwtUtil;

  public GameController(AccountService accountService, GameService gameService,
      GameCollectionService gameCollectionService, JwtUtil jwtUtil) {
    this.accountService = accountService;
    this.gameService = gameService;
    this.gameCollectionService = gameCollectionService;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/validateGamePersistenceAndCollect")
  public ResponseEntity<List<String>> validateGamePersistenceAndCollect(
      @RequestHeader("Authorization") String bearerToken, @RequestBody List<String> gameIds, @RequestParam int id) {
    logger.info("Validating persistance...");

    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    // check if account exists
    var existingAccount = accountService.findById(id);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    List<String> allBggGames = gameService.findAllGameBggIds(); // this servers the same function as gameService.returnIfNotPersisted(gameIds) below that is commented out
    List<String> gameIdsNotPersisted = new ArrayList<>(gameIds); // when combined with this in the .removeall below
    List<String> allBggIdsAlreadyOwned = gameService.findAllBggIdsOfGamesOwnedByUser(id);


    gameIdsNotPersisted.removeAll(allBggGames); // finds all the BggGameIds of games that are not persisted
    gameIds.removeAll(gameIdsNotPersisted); // this makes gameIds be all games that are NOT already persisted so that they aren't looped through since this function doesn't persist those games
    gameIds.removeAll(allBggIdsAlreadyOwned); // this removes all games that you already own

    //the var changes are not Ayden's
    for(int i = 0; i<gameIds.size(); i++){
      Game gameToCollect = gameService.findGameByBggId(Integer.valueOf(gameIds.get(i)));
      if (gameToCollect != null){
        var currentCollection = gameCollectionService.linkAccountToGame(existingAccount, gameToCollect);
        if (currentCollection!=null)
          logger.info("Account #" + currentCollection.getAccountId() + " now owns game #" + currentCollection.getGameId());
    }}


    //var gameIdsNotPersisted = gameService.returnIfNotPersisted(gameIds); // this returns a list of every ID we don't
                                                                         // have a game for
    logger.info("Returning missing games");
    return ResponseEntity.status(HttpStatus.OK)
        .body(gameIdsNotPersisted);
  }

  @PostMapping("/persistOrCollectOneGame")
  public ResponseEntity<?> persistOrCollectOneGame(@RequestHeader("Authorization") String bearerToken, @RequestBody Game game, @RequestParam int id) {
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    // check if account exists
    var existingAccount = accountService.findById(id);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }
  //the var changes are not Ayden's
    var testGame = gameService.findGameByBggId(game.getBggId());
    if (testGame == null){ //checking if it is a bgg game we have
      testGame = gameService.findGameByTitle(game.getTitle());
      if (testGame == null){ // checking if the game exists at all in our system and IF it does, add to collection
        if (game.getBggId() != null){
          testGame = gameService.register(game);
          logger.info("BGG game \"" + game.getTitle() + "\" with BGG id #" + game.getBggId() + " has been added to the database");
        } else{
          testGame = gameService.register(game);
          logger.info("Custom game \"" + game.getTitle() + "\" with a non-existant BGG id" + game.getGameId() + " has been added to the database");
        }
        gameCollectionService.linkAccountToGame(existingAccount, testGame);
        return ResponseEntity.status(HttpStatus.CREATED)
            .build();
      }
    }
    gameCollectionService.linkAccountToGame(existingAccount, testGame);
    return ResponseEntity.status(HttpStatus.OK)
      .build();
  }

  @GetMapping("/checkGameOwnership")
  public ResponseEntity<?> checkGameOwnership(@RequestHeader("Authorization") String bearerToken, @RequestParam int gameId, @RequestParam int accountId) {
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
      //check if account exists
    var existingAccount = accountService.findById(accountId);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

      //check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }
      //the var changes are not Ayden's
    Game testGame = gameService.findGameByDatabaseGameId(gameId);
    GameCollection checkCollection = gameCollectionService.checkOwnership(existingAccount, testGame);
    if(checkCollection != null)
      return ResponseEntity.status(HttpStatus.OK)
        .build();
    else
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .build();
  }

  @DeleteMapping("/removeGameOwnership")
  public ResponseEntity<?> removeGameOwnership(@RequestHeader("Authorization") String bearerToken, @RequestParam int gameId, @RequestParam int accountId) {
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
      //check if account exists
    var existingAccount = accountService.findById(accountId);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

      //check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }
      //the var changes are not Ayden's
    Game testGame = gameService.findGameByDatabaseGameId(gameId);
    gameCollectionService.removeOwnership(existingAccount, testGame);
    return ResponseEntity.status(HttpStatus.OK)
      .build();

  }


  @PostMapping("/persistAndCollectManyGames")
  public ResponseEntity<?> persistAndCollectManyGames(@RequestHeader("Authorization") String bearerToken,
      @RequestBody List<Game> games, @RequestParam int id) {
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    // check if account exists
    var existingAccount = accountService.findById(id);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }
    // the var changes are not Ayden's
    for (int i = 0; i < games.size(); i++) {
      var testGame = gameService.findGameByBggId(games.get(i).getBggId());
      if (testGame == null) { // if a game does not exist, register it and make it exist
        testGame = gameService.register(games.get(i));
        logger.info(games.get(i).getTitle() + " has been added to the database");
      }
      gameCollectionService.linkAccountToGame(existingAccount, testGame);

    }
    return ResponseEntity.status(HttpStatus.CREATED) // could later change status here instead of created
        .build();
  }

  @GetMapping("/getGamesByAccount")
  public ResponseEntity<?> getGamesByAccount(@RequestHeader("Authorization") String bearerToken, int accountId) {
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    // check if account exists
    var existingAccount = accountService.findById(accountId);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // check the JWT and the user
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    List<Game> allOwnedGames = gameService.findWhoCollectedWhatGames(accountId);
    return ResponseEntity.status(HttpStatus.OK)
        .body(allOwnedGames);
  }

  @GetMapping("/getAllGames")
  public ResponseEntity<?> getAllGames() {
    return ResponseEntity.status(HttpStatus.OK)
        .body(gameService.findAllGames());
  }

}
