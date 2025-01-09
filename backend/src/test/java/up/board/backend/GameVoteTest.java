package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import up.board.backend.Controller.GameVoteController;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Game;
import up.board.backend.Entity.GameVote;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.GameVoteRepository;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameVoteService;
import up.board.backend.Utils.JwtUtil;

@SpringBootTest
@AutoConfigureTestDatabase
class GameVoteTest {

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private GameVoteRepository gameVoteRepository;

  @InjectMocks
  private GameVoteService gameVoteService;

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountService accountService;

  private GameVoteController gameVoteController;

  @BeforeEach
  void setup() {
    this.gameVoteController = new GameVoteController(gameVoteService, accountService, jwtUtil);
  }


  @Test
  void getGameVoteForAccount() {

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    var game = new Game();
    game.setGameId(1);

    var gameVote = new GameVote();
    gameVote.setAccount(account);
    gameVote.setGame(game);

    gameVote.setValue(1);

    when(gameVoteRepository.findByAccountIdAndGameId(any(Integer.class), any(Integer.class))).thenReturn(gameVote);

    //
    var response = gameVoteController.getGameVoteForAccount(account.getAccountId(), game.getGameId());
    var reponseVote = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(gameVote.getValue(), reponseVote);

    verify(gameVoteRepository).findByAccountIdAndGameId(any(Integer.class), any(Integer.class));
  }

  @Test
  void getGameVote() {

    when(gameVoteRepository.findGameVoteSum(any(Integer.class))).thenReturn(1);

    //
    var response = gameVoteController.getGameVote(1);
    var reponseVote = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(1, reponseVote);

    verify(gameVoteRepository).findGameVoteSum(any(Integer.class));
  }

  @Test
  void setGameVoteForAccount() {

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    var game = new Game();
    game.setGameId(1);

    var gameVote = new GameVote();
    gameVote.setAccount(account);
    gameVote.setGame(game);
    gameVote.setValue(1);

    var gameVoteOld = new GameVote();
    gameVoteOld.setAccount(account);
    gameVoteOld.setGame(game);
    gameVoteOld.setValue(0);

    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(accountRepository.findByUsername(any(String.class))).thenReturn(account);
    when(gameVoteRepository.findByAccountIdAndGameId(any(Integer.class), any(Integer.class))).thenReturn(gameVoteOld);

    //
    var response = gameVoteController.setGameVoteForAccount("", gameVote);
    var reponseBody = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(true, reponseBody);

    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(accountRepository).findByUsername(any(String.class));
    verify(gameVoteRepository).findByAccountIdAndGameId(any(Integer.class), any(Integer.class));
    verify(gameVoteRepository).save(any(GameVote.class));
  }

  @Test
  void setGameVoteForAccount_sameVote() {

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test_user");

    var game = new Game();
    game.setGameId(1);

    var gameVote = new GameVote();
    gameVote.setAccount(account);
    gameVote.setGame(game);
    gameVote.setValue(1);

    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(accountRepository.findByUsername(any(String.class))).thenReturn(account);
    when(gameVoteRepository.findByAccountIdAndGameId(any(Integer.class), any(Integer.class))).thenReturn(gameVote);

    //
    var response = gameVoteController.setGameVoteForAccount("", gameVote);
    var reponseBody = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(true, reponseBody);

    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(accountRepository).findByUsername(any(String.class));
    verify(gameVoteRepository).findByAccountIdAndGameId(any(Integer.class), any(Integer.class));
  }
}
