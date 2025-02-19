package up.board.backend.Service;

import java.util.ArrayList;
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

  public Thread getThreadById(int threadId) {
    return threadRepository.getThreadByThreadId(threadId);
  }

  public List<Thread> getThreads(int forumId) {
    var threadDTOs = threadRepository.getThreadsByForumId(forumId);

    var threadList = new ArrayList<Thread>();
    for (var dto : threadDTOs) {
      var thread = dto.getThread();
      thread.setUsername(dto.getUsername());

      if (!thread.isDeleted())
        threadList.add(thread);
    }

    return threadList;
  }

  public Thread deleteThread(Thread thread) {
    var foundThread = getThreadById(thread.getThreadId());
    if (foundThread == null)
      return null;

    foundThread.setDeleted(true);
    return threadRepository.save(foundThread);
  }

}