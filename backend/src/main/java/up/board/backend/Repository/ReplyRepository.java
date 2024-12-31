package up.board.backend.Repository;

import up.board.backend.Entity.Reply;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Integer> {

  public Reply getReplyByReplyId(int replyId);

  //
  public List<Reply> getReplyByThreadId(int threadId);

}
