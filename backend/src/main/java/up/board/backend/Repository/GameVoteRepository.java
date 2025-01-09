package up.board.backend.Repository;

import up.board.backend.Entity.GameVote;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GameVoteRepository extends JpaRepository<GameVote, Integer> {

  @Query("SELECT v FROM GameVote v WHERE v.account.accountId = ?1 AND v.game.gameId = ?2")
  GameVote findByAccountIdAndGameId(int accountId, int gameId);

  @Query("SELECT SUM(v.value) FROM GameVote v WHERE v.game.gameId = ?1")
  Integer findGameVoteSum(int gameId);

}
