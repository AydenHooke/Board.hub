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

  
  public Game Register(Game game) {
    return gameRepository.save(game);
  }

  public List<String> returnIfNotPersisted(List<String> gameIds){
    List<String> idNotFound = new ArrayList<>();
    Game testGame;
    for(int i = 0; i<gameIds.size(); i++){
        testGame = gameRepository.findGameByBggId(Integer.parseInt(gameIds.get(i)));
        if(testGame == null) // if you did NOT find the id, then add it to the list of games you did not find the id for
            idNotFound.add(gameIds.get(i));
    }
    return idNotFound;
  }

}