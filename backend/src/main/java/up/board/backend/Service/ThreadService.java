package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Reply;
import up.board.backend.Entity.Thread;
import up.board.backend.Repository.ReplyRepository;
import up.board.backend.Repository.ThreadRepository;

@Service
public class ThreadService {

  ThreadRepository threadRepository;
  ReplyRepository replyRepository;

  public ThreadService(ThreadRepository threadRepository, ReplyRepository replyRepository) {
    this.threadRepository = threadRepository;
    this.replyRepository = replyRepository;
  }

  public Thread create(Thread thread) {
    return threadRepository.save(thread);
  }

  public List<Reply> getReplies(int threadId) {
    return replyRepository.getReplyByThreadId(threadId);
  }

}