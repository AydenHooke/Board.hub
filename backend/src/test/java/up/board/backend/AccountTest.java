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

import up.board.backend.Controller.AccountController;
import up.board.backend.Entity.Account;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Service.AccountService;

@SpringBootTest
@AutoConfigureTestDatabase
class AccountTest {

  @Mock
  private AccountRepository accountRepository;

  @Mock
  private JwtUtil jwtUtil;

  @InjectMocks
  private AccountService accountService;

  private AccountController accountController;

  @BeforeEach
  void setup() {
    this.accountController = new AccountController(accountService, jwtUtil);
  }

  @Test
  void register() {

    var username = "test123";
    var password = "test456";
    var email = "test@test.com";

    var passwordHash = "fake_password_hash";

    var mock = new Account();
    mock.setAccountId(1);
    mock.setUsername(username);
    mock.setPasswordHash(password);
    mock.setEmail(email);

    when(accountRepository.findByUsername(any(String.class))).thenReturn(null);
    when(jwtUtil.generateToken(any(Account.class))).thenReturn(passwordHash);
    when(accountRepository.save(any(Account.class))).thenReturn(mock);

    //
    var response = accountController.register(mock);
    var responseAccount = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(mock.getAccountId(), responseAccount.getAccountId());
    assertEquals(mock.getUsername(), responseAccount.getUsername());
    assertEquals(mock.getPasswordHash(), null);

    // assertEquals(accountRepository, accountController);

    verify(accountRepository).findByUsername(any(String.class));
    verify(jwtUtil).generateToken(any(Account.class));
    verify(accountRepository).save(any(Account.class));
  }

}
