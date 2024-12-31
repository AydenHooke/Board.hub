package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Reply;
import up.board.backend.Repository.ReplyRepository;

@Service
public class ReplyService {

  ReplyRepository replyRepository;

  public ReplyService(ReplyRepository replyRepository) {
    this.replyRepository = replyRepository;
  }

  public Reply create(Reply reply) {
    return replyRepository.save(reply);
  }

  public Reply getReplyById(int replyId) {
    return replyRepository.getReplyByReplyId(replyId);
  }

  public List<Reply> getReplies(int threadId) {
    return replyRepository.getReplyByThreadId(threadId);
  }

}