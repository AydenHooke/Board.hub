package up.board.backend.Repository;

import up.board.backend.Entity.Thread;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer> {

  public Thread getThreadByThreadId(int threadId);

  //
  public List<Thread> getThreadsByForumId(int forumId);

}
