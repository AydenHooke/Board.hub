package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Thread;
import up.board.backend.Repository.ForumRepository;
import up.board.backend.Repository.ThreadRepository;

@Service
public class ForumService {

  ForumRepository forumRepository;
  ThreadRepository threadRepository;

  public ForumService(ForumRepository forumRepository, ThreadRepository threadRepository) {
    this.forumRepository = forumRepository;
    this.threadRepository = threadRepository;
  }

  public List<Thread> getThreads(int forumId){
    return threadRepository.getThreadsByForumId(forumId);
  }

}