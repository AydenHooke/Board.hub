package up.board.backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.JwtUtil;
import up.board.backend.Entity.Account;
import up.board.backend.Service.AccountService;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:5174")
public class AccountController {

  private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

  AccountService accountService;
  JwtUtil jwtUtil;

  //
  public AccountController(AccountService accountService) {
    this.accountService = accountService;
    this.jwtUtil = new JwtUtil();
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
    var existingAccount = accountService.findByUsername(account.getUsername());
    if (existingAccount != null) {
      return ResponseEntity.status(409).body("Username taken");
    }

    // Encode password
    var passwordHash = AccountService.GetPasswordHash(password);
    account.setPasswordHash(passwordHash);

    accountService.register(account);

    // Return JWT
    var token = jwtUtil.generateToken(account);
    return ResponseEntity.ok().body(token);
  }

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody Account account) {

    // Input sanitize
    var username = account.getUsername();
    var password = account.getPasswordHash();

    if (username == null || password == null) {
      return ResponseEntity.status(409).body("Missing credentials");
    }

    // Check user exists
    var passwordHash = AccountService.GetPasswordHash(password);
    var existingUser = accountService.findByUsernameAndPassword(username, passwordHash);
    if (existingUser == null) {
      return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Return token
    var token = jwtUtil.generateToken(existingUser);
    return ResponseEntity.ok().body(token);
  }

  @PostMapping("/authTest")
  public ResponseEntity<String> authTest(@RequestHeader("jwt") String token, @RequestBody Account account) {

    // Input sanitize
    var username = account.getUsername();
    if (username == null) {
      return ResponseEntity.status(409).body("Missing username");
    }
    if (token == null) {
      return ResponseEntity.status(409).body("Missing JWT");
    }

    // Validate JWT
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(token);
    if (!tokenUsername.equals(username)) {
      return ResponseEntity.status(401).body("Invalid JWT");
    }

    // Return ok
    return ResponseEntity.ok().body("Yup");
  }

}