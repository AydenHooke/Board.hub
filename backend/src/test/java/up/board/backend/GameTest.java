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
import up.board.backend.Entity.Game;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.GameRepository;
import up.board.backend.Service.AccountService;
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

  private GameController gameController;

  @BeforeEach
  void setup() {
    this.gameController = new GameController(gameService);
  }

  @Test
  void validateGamePersistance() {

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

    when(gameRepository.findGameByBggId(games.get(0).getGameId())).thenReturn(games.get(0));
    when(gameRepository.findGameByBggId(games.get(1).getGameId())).thenReturn(null);

    //
    var response = gameController.validateGamePersistence(gameIds);
    var responseGames = response.getBody();

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertEquals(1, responseGames.size());
    assertEquals(gameIds.get(1), responseGames.get(0));

    verify(gameRepository, times(2)).findGameByBggId(any(Integer.class));
  }

  @Test
  void persistOneGame() {

    var game = new Game();
    game.setBggId(1);
    game.setTitle("test game");
    game.setDescription("Test game desc");
    game.setPrice(13.5f);

    when(gameRepository.findGameByBggId(any(Integer.class))).thenReturn(null);
    when(gameRepository.save(any(Game.class))).thenReturn(game);

    //
    var response = gameController.persistOneGame(game);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());

    verify(gameRepository).findGameByBggId(any(Integer.class));
    verify(gameRepository).save(any(Game.class));
  }

  @Test
  void persistManyGames() {

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

    when(gameRepository.findGameByBggId(game0.getBggId())).thenReturn(null);
    when(gameRepository.findGameByBggId(game1.getBggId())).thenReturn(null);

    //
    var response = gameController.persistManyGames(games);

    assertEquals(HttpStatus.CREATED, response.getStatusCode());

    verify(gameRepository, times(2)).findGameByBggId(any(Integer.class));
    verify(gameRepository, times(2)).save(any(Game.class));
  }

}
