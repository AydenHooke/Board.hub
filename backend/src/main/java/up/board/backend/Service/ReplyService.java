package up.board.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Reply;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.ReplyRepository;

@Service
public class ReplyService {

  ReplyRepository replyRepository;
  AccountRepository accountRepository;

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
    var replyDTOs = replyRepository.getReplyByThreadId(threadId);

    var replyList = new ArrayList<Reply>();
    for (var dto : replyDTOs) {
      var reply = dto.getReply();
      reply.setUsername(dto.getUsername());

      if (reply.isDeleted())
        reply.setContent("[ deleted ]");

      replyList.add(reply);
    }

    return replyList;
  }

  public Reply deleteReply(Reply reply) {
    var foundReply = getReplyById(reply.getReplyId());
    if (foundReply == null)
      return null;

    foundReply.setDeleted(true);
    return replyRepository.save(foundReply);
  }

}