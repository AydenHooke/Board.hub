package up.board.backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Service.ForumService;

@RestController
@RequestMapping("/forum")
@CrossOrigin(origins = "http://localhost:5174")
public class ForumController {

  private static final Logger logger = LoggerFactory.getLogger(ForumController.class);

  ForumService forumService;

  //
  public ForumController(ForumService forumService) {
    this.forumService = forumService;
  }

  /// Endpoints


}