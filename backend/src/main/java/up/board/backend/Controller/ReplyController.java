package up.board.backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Reply;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.ReplyService;
import up.board.backend.Service.ThreadService;
import up.board.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/reply")
@CrossOrigin(origins = "http://localhost:5174")
public class ReplyController {

  private static final Logger logger = LoggerFactory.getLogger(ReplyController.class);

  ReplyService replyService;
  AccountService accountService;
  JwtUtil jwtUtil;
  ThreadService threadService;

  //
  public ReplyController(ReplyService replyService, AccountService accountService, JwtUtil jwtUtil,
      ThreadService threadService) {
    this.replyService = replyService;
    this.accountService = accountService;
    this.jwtUtil = jwtUtil;
    this.threadService = threadService;
  }

  /// Endpoints
  @GetMapping("/get/{threadId}")
  public ResponseEntity<List<Reply>> getReplies(@PathVariable Integer threadId) {

    // Return threads for forum
    var replies = replyService.getReplies(threadId);
    return ResponseEntity.ok().body(replies);
  }

  @PostMapping("/post")
  public ResponseEntity<Reply> postReply(@RequestHeader("Authorization") String bearerToken,
      @RequestBody Reply reply) {

    // Input sanitization

    // Check thread exists
    var existingThread = threadService.getThreadById(reply.getThreadId());
    if (existingThread == null) {
      return ResponseEntity.status(409).header("server-error", "Thread does not exist").body(null);
    }

    // Check reply exists if replying to reply
    if (reply.getReplyToId() != null) {
      var existingReply = replyService.getReplyById(reply.getReplyToId());
      if (existingReply == null) {
        return ResponseEntity.status(409).header("server-error", "Parent reply does not exist").body(null);
      }
    }

    // Check user exists
    var existingAccount = accountService.findById(reply.getAccountId());
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // Validate JWT
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (tokenUsername == null || !tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    // Return threads for forum
    replyService.create(reply);
    return ResponseEntity.ok().body(reply);
  }

  @DeleteMapping("/{replyId}")
  public ResponseEntity<Boolean> deleteReply(@RequestHeader("Authorization") String bearerToken,
      @PathVariable Integer replyId) {

    // Get existing thread
    var reply = replyService.getReplyById(replyId);
    if (reply == null) {
      return ResponseEntity.status(409).header("server-error", "Reply does not exist").body(false);
    }

    // Validate JWT
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(false);
    }
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (tokenUsername == null) {
      return ResponseEntity.status(409).header("server-error", "Invalid JWT").body(false);
    }

    // Check user exists
    var existingAccount = accountService.findByUsername(tokenUsername);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(false);
    }

    if (reply.getAccountId() != existingAccount.getAccountId()) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(false);
    }

    // Return threads for forum
    replyService.deleteReply(reply);
    return ResponseEntity.ok().body(true);
  }

}