package up.board.backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import up.board.backend.Entity.Thread;
import up.board.backend.Repository.ThreadRepository;

@Service
public class ThreadService {

  private static final Logger logger = LoggerFactory.getLogger(ThreadService.class);

  ThreadRepository threadRepository;

  public ThreadService(ThreadRepository threadRepository) {
    this.threadRepository = threadRepository;
  }

  public Thread create(Thread thread) {
    return threadRepository.save(thread);
  }

  public Thread getThreadById(int threadId) {
    return threadRepository.getThreadByThreadId(threadId);
  }

  public List<Thread> getThreads(int forumId) {
    var threadDTOs = threadRepository.getThreadsByForumId(forumId);

    var threadList = new ArrayList<Thread>();
    for(var dto : threadDTOs){
      var thread = dto.getThread();
      thread.setUsername(dto.getUsername());
      threadList.add(thread);
    }

    return threadList;
  }

}