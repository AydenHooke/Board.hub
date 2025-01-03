package up.board.backend.Repository;

import up.board.backend.Entity.Thread;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer> {

  public Thread getThreadByThreadId(int threadId);

  //
  public interface ThreadWithUsername {
    public Thread getThread();
    public String getUsername();
  }
  @Query(value = "SELECT t as thread, a.username AS username FROM Thread t JOIN Account a ON (t.accountId = a.accountId) WHERE t.forumId = :forumId")
  public List<ThreadWithUsername> getThreadsByForumId(int forumId);

}
