package up.board.backend.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import up.board.backend.Entity.Account;
import up.board.backend.Repository.AccountRepository;

@Service
public class AccountService {

  AccountRepository accountRepository;

  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  //
  public Account register(Account account) {
    return accountRepository.save(account);
  }

  //
  public Account findByUsername(String username) {
    return accountRepository.findByUsername(username);
  }

  public String findPasswordHash(Account account) {
    return accountRepository.findPasswordHashByUsername(account.getUsername()).getPasswordHash();
  }

  //
  public static String GetPasswordHash(String plaintextPassword) {

    var encoder = new BCryptPasswordEncoder();
    return encoder.encode(plaintextPassword);
  }

  public static boolean PasswordMatches(String plaintextPassword, String hashPassword) {
    var encoder = new BCryptPasswordEncoder();
    return encoder.matches(plaintextPassword, hashPassword);
  }

}