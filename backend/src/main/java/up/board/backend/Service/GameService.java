package up.board.backend.Service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import up.board.backend.Entity.Game;
import up.board.backend.Repository.GameCollectionRepository;
import up.board.backend.Repository.GameRepository;

@Service
@Transactional
public class GameService {

  GameRepository gameRepository;
  GameCollectionRepository gameCollectionRepository;

  public GameService(GameRepository gameRepository, GameCollectionRepository gameCollectionRepository) {
    this.gameRepository = gameRepository;
    this.gameCollectionRepository = gameCollectionRepository;
  }

  public Game register(Game game) {
    return gameRepository.save(game);
  }

  public List<String> returnIfNotPersisted(List<String> gameIds) {
    var idNotFound = new ArrayList<String>();
    for (int i = 0; i < gameIds.size(); i++) {
      var testGame = gameRepository.findGameByBggId(Integer.parseInt(gameIds.get(i)));
      if (testGame == null) // if you did NOT find the id, then add it to the list of games you did not find
                            // the id for
        idNotFound.add(gameIds.get(i));
    }
    return idNotFound;
  }

  public Game findGameByBggId(int bggId) {
    return gameRepository.findGameByBggId(bggId);
  }

  public Game findGameByDatabaseGameId(int gameId) {
    return gameRepository.findGameByGameId(gameId);
  }

  public Game findGameByTitle(String gameTitle) {
    return gameRepository.findGameByTitle(gameTitle);
  }

  public List<Game> findAllGames() {
    return gameRepository.findGamesByGameIdNotNull();
  }

  public List<String> findAllGameBggIds() {
    return gameRepository.findAllBggIds();
  }

  public List<String> findAllBggIdsOfGamesOwnedByUser(int accountId){
    return gameRepository.findAllBggGameIdsByCollection(accountId);
  }

  public List<Game> findWhoCollectedWhatGames(int accountId) {
    /*var accountGameCollections = gameCollectionRepository.findGameCollectionsByAccountId(accountId);
    var collectedGames = new ArrayList<Game>();
    if (accountGameCollections != null)
      for (var gameCollection : accountGameCollections)
        collectedGames.add(gameRepository.findGameByGameId(gameCollection.getGameId()));
        */

    var collectedGames = gameRepository.findGamesByCollection(accountId);

    return collectedGames;
  }
}