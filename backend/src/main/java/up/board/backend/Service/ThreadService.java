package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Thread;
import up.board.backend.Repository.ThreadRepository;

@Service
public class ThreadService {

  ThreadRepository threadRepository;

  public ThreadService(ThreadRepository threadRepository) {
    this.threadRepository = threadRepository;
  }

  public Thread create(Thread thread) {
    return threadRepository.save(thread);
  }

  public List<Thread> getThreads(int forumId) {
    return threadRepository.getThreadsByForumId(forumId);
  }

}