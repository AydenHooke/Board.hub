package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import up.board.backend.Controller.GameController;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Game;
import up.board.backend.Entity.GameCollection;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.GameCollectionRepository;
import up.board.backend.Repository.GameRepository;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameCollectionService;
import up.board.backend.Service.GameService;
import up.board.backend.Utils.JwtUtil;

@SpringBootTest
@AutoConfigureTestDatabase
class GameTest {

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private GameRepository gameRepository;

  @InjectMocks
  private GameService gameService;

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountService accountService;

  @Mock
  private GameCollectionRepository gameCollectionRepository;

  @InjectMocks
  private GameCollectionService gameCollectionService;

  private GameController gameController;

  @BeforeEach
  void setup() {
    this.gameController = new GameController(accountService, gameService, gameCollectionService, jwtUtil);
  }

  /*@Test
  void validateGamePersistenceAndCollect() {

    var game0 = new Game();
    game0.setGameId(1);
    game0.setBggId(1);
    game0.setTitle("test game 0");
    game0.setDescription("Test game desc");
    game0.setPrice(13.5f);

    var game1 = new Game();
    game1.setGameId(2);
    game1.setBggId(2);
    game1.setTitle("test game 1");
    game1.setDescription("Test game desc");
    game1.setPrice(55f);

    var games = new ArrayList<Game>();
    games.add(game0);
    games.add(game1);

    var gameIds = new ArrayList<String>();
    gameIds.add(games.get(0).getGameId() + "");
    gameIds.add(games.get(1).getGameId() + "");

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    var gameCollection = new GameCollection();
    gameCollection.setAccountId(account.getAccountId());
    gameCollection.setGameId(game0.getGameId());

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(gameRepository.findGameByBggId(games.get(0).getGameId())).thenReturn(games.get(0));
    when(gameCollectionRepository.findGameCollectionByAccountIdAndGameId(any(Integer.class), any(Integer.class))).thenReturn(null);
    when(gameCollectionRepository.save(any(GameCollection.class))).thenReturn(gameCollection);
    when(gameRepository.findGameByBggId(games.get(1).getGameId())).thenReturn(null);

    //
    var response = gameController.validateGamePersistenceAndCollect("", gameIds, account.getAccountId());
    var responseGames = response.getBody();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(1, responseGames.size());
    assertEquals(gameIds.get(1), responseGames.get(0));

    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(gameCollectionRepository).findGameCollectionByAccountIdAndGameId(any(Integer.class), any(Integer.class));
    verify(gameCollectionRepository).save(any(GameCollection.class));
    verify(gameRepository, times(4)).findGameByBggId(any(Integer.class));
  }*/

  @Test
  void persistOrCollectOneGame() {

    var game = new Game();
    game.setBggId(1);
    game.setTitle("test game");
    game.setDescription("Test game desc");
    game.setPrice(13.5f);

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    var gameCollection = new GameCollection();
    gameCollection.setAccountId(account.getAccountId());
    gameCollection.setGameId(game.getGameId());

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(gameRepository.findGameByBggId(any(Integer.class))).thenReturn(null);
    //when(gameCollectionRepository.findGameCollectionByAccountIdAndGameId(any(Integer.class), any(Integer.class))).thenReturn(gameCollection);
    when(gameRepository.save(any(Game.class))).thenReturn(game);

    //
    var response = gameController.persistOrCollectOneGame("", game, account.getAccountId());

    assertEquals(HttpStatus.CREATED, response.getStatusCode());

    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(gameRepository).findGameByBggId(any(Integer.class));
    //verify(gameCollectionRepository).findGameCollectionByAccountIdAndGameId(any(Integer.class), any(Integer.class));
    verify(gameRepository).save(any(Game.class));
  }

  @Test
  void persistAndCollectManyGames() {

    var game0 = new Game();
    game0.setGameId(1);
    game0.setBggId(1);
    game0.setTitle("test game 0");
    game0.setDescription("Test game desc");
    game0.setPrice(13.5f);

    var game1 = new Game();
    game1.setGameId(2);
    game1.setBggId(2);
    game1.setTitle("test game 1");
    game1.setDescription("Test game desc");
    game1.setPrice(55f);

    var games = new ArrayList<Game>();
    games.add(game0);
    games.add(game1);

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(gameRepository.findGameByBggId(any(Integer.class))).thenReturn(null);
    when(gameRepository.save(game0)).thenReturn(game0);
    when(gameRepository.save(game1)).thenReturn(game1);

    //
    var response = gameController.persistAndCollectManyGames("", games, account.getAccountId());

    assertEquals(HttpStatus.CREATED, response.getStatusCode());

    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(gameRepository, times(2)).findGameByBggId(any(Integer.class));
    verify(gameRepository, times(2)).save(any(Game.class));
  }

}
