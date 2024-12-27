package up.board.backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Thread;
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
  @GetMapping("/get/{forumId}")
  public ResponseEntity<List<Thread>> getThreads(@PathVariable Integer forumId) {

    // Return threads for forum
    var threads = forumService.getThreads(forumId);
    return ResponseEntity.ok().body(threads);
  }

}