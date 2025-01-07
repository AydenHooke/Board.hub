package up.board.backend.Service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import up.board.backend.Entity.Game;
import up.board.backend.Repository.GameRepository;

@Service
@Transactional
public class GameService {

  GameRepository gameRepository;

  public GameService(GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  public Game register(Game game) {
    return gameRepository.save(game);
  }

  public List<String> returnIfNotPersisted(List<String> gameIds) {
    List<String> idNotFound = new ArrayList<>();
    Game testGame;
    for (int i = 0; i < gameIds.size(); i++) {
      testGame = gameRepository.findGameByBggId(Integer.parseInt(gameIds.get(i)));
      if (testGame == null) // if you did NOT find the id, then add it to the list of games you did not find the id for
        idNotFound.add(gameIds.get(i));
    }
    return idNotFound;
  }

  public Game findGameByBggId(int bggId) {
    if(gameRepository.findGameByBggId(bggId) != null)
      return gameRepository.findGameByBggId(bggId);
    else
      return null;
  }

  public Game findGameByDatabaseGameId(int gameId) {
    if(gameRepository.findGameByBggId(gameId) != null)
      return gameRepository.findGameByBggId(gameId);
    else
      return null;
  }

  public Game findGameByTitle(String gameTitle){
    if(gameRepository.findGameByTitle(gameTitle) != null)
      return gameRepository.findGameByTitle(gameTitle);
    else 
      return null;
  }

  public List<Game> findAllGames() {
    return gameRepository.findGamesByGameIdNotNull();
  }

}