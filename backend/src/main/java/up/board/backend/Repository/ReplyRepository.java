package up.board.backend.Repository;

import up.board.backend.Entity.Reply;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {

  public Reply getReplyByReplyId(int replyId);

  //
  @Query(value = "SELECT r.*, a.* FROM Reply r INNER JOIN Account a ON (r.account_id = a.account_id) WHERE r.thread_id = :threadId", nativeQuery = true)
  public List<Map<String, Object>> getReplyByThreadId(int threadId);

}
