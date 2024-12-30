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
import up.board.backend.Utils.EmailValidator;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:5174")
public class AccountController {

  private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

  AccountService accountService;
  JwtUtil jwtUtil;

  //
  public AccountController(AccountService accountService, JwtUtil jwtUtil) {
    this.accountService = accountService;
    this.jwtUtil = jwtUtil;
  }

  /// Endpoints
  @PostMapping("/register")
  public ResponseEntity<Account> register(@RequestBody Account account) {

    // Check valid username
    var username = account.getUsername();
    if (username == null || username.length() == 0) {
      return ResponseEntity.status(409).header("server-error", "Invalid username").body(null);
    }

    // Check valid Email
    var email = account.getEmail();
    if (email == null || email.length() == 0 || !EmailValidator.isValid(email)) {
      return ResponseEntity.status(409).header("server-error", "Invalid email").body(null);
    }

    // Check valid password
    var password = account.getPasswordHash();
    if (password == null || password.length() == 0) {
      return ResponseEntity.status(409).header("server-error", "Invalid password").body(null);
    }

    // Make sure username is not in use
    var existingAccount = accountService.findByUsername(account.getUsername());
    if (existingAccount != null) {
      return ResponseEntity.status(409).header("server-error", "Username taken").body(null);
    }

    // Encode password
    var passwordHash = AccountService.GetPasswordHash(password);
    account.setPasswordHash(passwordHash);

    var accountNew = accountService.register(account);

    // Return JWT + stripped account
    var token = jwtUtil.generateToken(account);
    accountNew.setPasswordHash(null);
    return ResponseEntity.ok().header("Authorization", "Bearer " + token).body(accountNew);
  }

  @PostMapping("/login")
  public ResponseEntity<Account> login(@RequestBody Account account) {

    // Input sanitize
    var username = account.getUsername();
    var password = account.getPasswordHash();
    if (username == null || password == null) {
      return ResponseEntity.status(409).header("server-error", "Missing credentials").body(null);
    }

    // Check user exists
    var existingAccount = accountService.findByUsername(username);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // Authenticate
    var passwordPlain = password;
    var passwordHash = accountService.findPasswordHash(existingAccount);
    if (!AccountService.PasswordMatches(passwordPlain, passwordHash)) {
      return ResponseEntity.status(401).header("server-error", "Invalid credentials").body(null);
    }

    // Return token + stripped account
    var token = jwtUtil.generateToken(existingAccount);
    existingAccount.setPasswordHash(null);
    return ResponseEntity.ok().header("Authorization", "Bearer " + token).body(existingAccount);
  }

  @PostMapping("/authTest")
  public ResponseEntity<String> authTest(@RequestHeader("Authorization") String bearerToken, @RequestBody Account account) {

    // Input sanitize
    var username = account.getUsername();
    if (username == null) {
      return ResponseEntity.status(409).body("Missing username");
    }
    if (bearerToken == null) {
      return ResponseEntity.status(409).body("Missing JWT");
    }

    // Validate JWT
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(username)) {
      return ResponseEntity.status(401).body("Invalid JWT");
    }

    // Return ok
    return ResponseEntity.ok().body("Yup");
  }

}