package up.board.backend.Service;

import org.springframework.stereotype.Service;

import up.board.backend.Repository.ForumRepository;
import up.board.backend.Repository.ThreadRepository;

@Service
public class ForumService {

  ForumRepository forumRepository;
  ThreadRepository threadRepository;

  public ForumService(ForumRepository forumRepository) {
    this.forumRepository = forumRepository;
  }

}