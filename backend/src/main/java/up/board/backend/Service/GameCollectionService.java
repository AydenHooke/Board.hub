package up.board.backend.Service;

import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Game;
import up.board.backend.Entity.GameCollection;
import up.board.backend.Repository.GameCollectionRepository;
import up.board.backend.Repository.GameRepository;

@Service
@Transactional
public class GameCollectionService {
  private static final Logger logger = LoggerFactory.getLogger(GameCollectionService.class);

  GameRepository gameRepository;
  GameCollectionRepository gameCollectionRepository;

  public GameCollectionService(GameRepository gameRepository, GameCollectionRepository gameCollectionRepository) {
    this.gameRepository = gameRepository;
    this.gameCollectionRepository = gameCollectionRepository;
  }


    public GameCollection linkAccountToGame(Account account, Game game) {
        if(account != null && game != null){ // the game collection class serves as a link to connect all the games a player owns to their account in an entity - a join table
            GameCollection gameCollection = gameCollectionRepository.findGameCollectionByAccountIdAndGameId(account.getAccountId(), game.getGameId());
            if(gameCollection == null){
                gameCollection = new GameCollection();
                gameCollection.setAccountId(account.getAccountId());
                gameCollection.setGameId(game.getGameId());
                logger.info(account.getUsername() + "(Account #" + gameCollection.getAccountId() + ") now owns " + game.getTitle() + "(Internal ID #" + gameCollection.getGameId() + ")");
                return gameCollectionRepository.save(gameCollection);
            }
        }

    return null;
  }

    public GameCollection checkOwnership(Account account, Game game){
        GameCollection gameCollection = gameCollectionRepository.findGameCollectionByAccountIdAndGameId(account.getAccountId(), game.getGameId());
        return gameCollection;
    }

    public void removeOwnership(Account account, Game game){
        gameCollectionRepository.delete(gameCollectionRepository.findGameCollectionByAccountIdAndGameId(account.getAccountId(), game.getGameId()));
    }
}
