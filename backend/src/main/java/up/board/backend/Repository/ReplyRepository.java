package up.board.backend.Repository;

import up.board.backend.Entity.Reply;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {

  public Reply getReplyByReplyId(int replyId);

  //
  public interface ReplyWithUsername {
    public Reply getReply();
    public String getUsername();
  }
  @Query(value = "SELECT r as reply, a.username AS username FROM Reply r JOIN Account a ON (r.accountId = a.accountId) WHERE r.threadId = :threadId")
  public List<ReplyWithUsername> getReplyByThreadId(int threadId);

}
