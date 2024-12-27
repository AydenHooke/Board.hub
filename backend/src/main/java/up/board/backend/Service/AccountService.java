package up.board.backend.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import up.board.backend.Entity.Account;
import up.board.backend.Repository.AccountRepository;

@Service
@Transactional
public class AccountService {

  AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  //
  public Account Register(Account account) {
    return accountRepository.save(account);
  }

  //
  public Account FindByUsername(String username) {
    return accountRepository.findByUsername(username);
  }

  //
  public static String GetEncodedPassword(String plaintextPassword) {
    var encoder = new BCryptPasswordEncoder();
    return encoder.encode(plaintextPassword);
  }

}