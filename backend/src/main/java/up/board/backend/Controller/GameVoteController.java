package up.board.backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameService;
import up.board.backend.Service.GameVoteService;
import up.board.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/gameVote")
@CrossOrigin(origins = "http://localhost:5174")
public class GameVoteController {

  //private static final Logger logger = LoggerFactory.getLogger(GameVoteController.class);

  GameVoteService gameVoteService;
  AccountService accountService;
  JwtUtil jwtUtil;

  //
  public GameVoteController(GameVoteService gameVoteService, AccountService accountService, JwtUtil jwtUtil) {
    this.gameVoteService = gameVoteService;
    this.accountService = accountService;
    this.jwtUtil = jwtUtil;
  }

  /// Endpoints
  @GetMapping("/account/{accountId}/{gameId}")
  public ResponseEntity<Integer> getGameVoteForAccount(@PathVariable Integer accountId, @PathVariable Integer gameId) {

    var gameVote = gameVoteService.getGameVote(accountId, gameId);
    var vote = gameVote == null ? 0 : gameVote.getValue();

    // Return threads for forum
    return ResponseEntity.ok().body(vote);
  }

  @GetMapping("/game/{gameId}")
  public ResponseEntity<Integer> getGameVote(@PathVariable Integer gameId) {

    var gameVote = gameVoteService.getVoteSum(gameId);

    // Return threads for forum
    return ResponseEntity.ok().body(gameVote);
  }

  @PostMapping("/vote")
  public ResponseEntity<Boolean> setGameVoteForAccount(@RequestHeader("Authorization") String bearerToken,
      @RequestBody GameVote gameVote) {

    // Validate JWT
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    var existingAccount = accountService.findByUsername(tokenUsername);
    if (existingAccount == null || existingAccount.getAccountId() != gameVote.getAccount().getAccountId()) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    var existingGameVote = gameVoteService.getGameVote(existingAccount.getAccountId(), gameVote.getGameVoteId());
    var existingVote = gameVote == null ? 0 : gameVote.getValue();
    if (gameVote.getValue() == existingVote) {
      return ResponseEntity.ok().body(true);
    }

    if (existingGameVote != null)
      gameVote.setGameVoteId(existingGameVote.getGameVoteId());
    gameVoteService.save(gameVote);

    // Return threads for forum
    return ResponseEntity.ok().body(true);
  }

}