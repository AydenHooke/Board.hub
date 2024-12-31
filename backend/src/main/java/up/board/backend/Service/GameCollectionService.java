package up.board.backend.Service;

import java.util.List;
import java.util.ArrayList;

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
    GameRepository gameRepository;
    GameCollectionRepository gameCollectionRepository;

    public GameCollectionService(GameRepository gameRepository, GameCollectionRepository gameCollectionRepository) {
        this.gameRepository = gameRepository;
        this.gameCollectionRepository = gameCollectionRepository;
      }

    public GameCollection LinkAccountToGame(Account account, Game game) {
        GameCollection gameCollection = new GameCollection();
        if(account != null && game != null){ // the game collection class serves as a link to connect all the games a player owns to their account in an entity - a join table
            gameCollection.setAccountId(account.getAccountId());
            gameCollection.setGameId(game.getGameId());
            return gameCollectionRepository.save(gameCollection);
        }
        else
            return null;
       
    }




}
