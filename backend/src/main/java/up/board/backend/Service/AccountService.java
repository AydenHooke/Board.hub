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
  public Account save(Account account) {
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
  public String getPasswordHash(String plaintextPassword) {

    var encoder = new BCryptPasswordEncoder();
    return encoder.encode(plaintextPassword);
  }

  public boolean passwordMatches(String plaintextPassword, String hashPassword) {
    var encoder = new BCryptPasswordEncoder();
    return encoder.matches(plaintextPassword, hashPassword);
  }

  public Account findByEmail(String newEmail) {
    return accountRepository.findByEmail(newEmail);
  }

  public Account findById(Integer id) {
    return accountRepository.findByAccountId(id);
  }


}