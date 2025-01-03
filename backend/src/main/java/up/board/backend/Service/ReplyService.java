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
    var nativeReults = replyRepository.getReplyByThreadId(threadId);

    var replyList = new ArrayList<Reply>();

    for (var element : nativeReults) {
      var newReply = new Reply();
      newReply.setAccountId((int) element.get("account_id"));
      newReply.setAccountName((String) element.get("username"));
      newReply.setContent((String) element.get("content"));
      newReply.setDeleted((boolean) element.get("is_deleted"));
      newReply.setReplyId((int) element.get("reply_id"));
      newReply.setReplyToId((Integer) element.get("reply_to_id"));
      newReply.setThreadId((int) element.get("thread_id"));

      replyList.add(newReply);
    }

    return replyList;
  }

}