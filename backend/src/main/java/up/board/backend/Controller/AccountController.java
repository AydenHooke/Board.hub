package up.board.backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Account;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameService;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:5174")
public class AccountController {

  private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

  AccountService accountService;
  GameService gameService;

  //
  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  /// Endpoints
  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody Account account) {

    // Check valid username
    var username = account.getUsername();
    if (username == null || username.length() == 0) {
      return ResponseEntity.status(409).body("Invalid username");
    }

    // Check valid password
    var password = account.getPasswordHash();
    if (password == null || password.length() == 0) {
      return ResponseEntity.status(409).body("Invalid password");
    }

    // Make sure username is not in use
    var existingAccount = accountService.FindByUsername(account.getUsername());
    if (existingAccount != null) {
      return ResponseEntity.status(409).body("Username taken");
    }

    // Encode password
    var encodedPassword = AccountService.GetEncodedPassword(password);
    account.setPasswordHash(encodedPassword);

    accountService.Register(account);

    // Return OK
    return ResponseEntity.ok().body("Yup");
  }

  @PostMapping("/validateGamePersistence")
  public ResponseEntity<?> validateGamePersistence(@RequestBody List<String> gameIds) {
      List<String> gameIdsNotPersisted = gameService.returnIfNotPersisted(gameIds); // this returns a list of every ID we don't have a game for
      if(gameIdsNotPersisted != null) // i.e. if there wasn't an error, return the gameIds as requested
        return ResponseEntity.status(HttpStatus.OK)
          .body(gameIdsNotPersisted);
      else
        return ResponseEntity.status(HttpStatus.CONFLICT)
          .build(); // if there was an error, report a conflict 
  }
  
}