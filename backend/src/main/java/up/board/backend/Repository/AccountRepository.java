package up.board.backend.Repository;

import up.board.backend.Entity.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

  public Account findByAccountId(Integer accountId);

  // Get account from username / password
  public Account findByUsername(String username);

  public interface PasswordHashOnly {
    String getPasswordHash();
  }
  public PasswordHashOnly findPasswordHashByUsername(String username);
}
