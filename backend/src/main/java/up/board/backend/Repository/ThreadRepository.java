package up.board.backend.Repository;

import up.board.backend.Entity.Thread;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer> {

  public Thread getThreadByThreadId(int threadId);

  //
  @Query(value = "SELECT t.*, a.* FROM Thread t INNER JOIN Account a ON (t.account_id = a.account_id) WHERE t.forum_id = :forumId", nativeQuery = true)
  public List<Map<String, Object>> getThreadsByForumId(int forumId);

}
