package up.board.backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Reply;
import up.board.backend.Service.ReplyService;

@RestController
@RequestMapping("/thread")
@CrossOrigin(origins = "http://localhost:5174")
public class ReplyController {

  private static final Logger logger = LoggerFactory.getLogger(ReplyService.class);

  ReplyService replyService;

  //
  public ReplyController(ReplyService replyService) {
    this.replyService = replyService;
  }

  /// Endpoints
  @GetMapping("/get/{threadId}")
  public ResponseEntity<List<Reply>> getReplies(@PathVariable Integer threadId) {

    // Return threads for forum
    var replies = replyService.getReplies(threadId);
    return ResponseEntity.ok().body(replies);
  }

  @PostMapping("/post")
  public ResponseEntity<String> postThread(@RequestBody Reply reply) {

    // Input sanitization

    // Return threads for forum
    replyService.create(reply);
    return ResponseEntity.ok().body("Created");
  }

}