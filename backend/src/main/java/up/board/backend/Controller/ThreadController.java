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

import up.board.backend.Entity.Thread;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.ThreadService;
import up.board.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/thread")
@CrossOrigin(origins = "http://localhost:5174")
public class ThreadController {

  private static final Logger logger = LoggerFactory.getLogger(ThreadController.class);

  ThreadService threadService;
  AccountService accountService;
  JwtUtil jwtUtil;

  //
  public ThreadController(ThreadService threadService, AccountService accountService, JwtUtil jwtUtil) {
    this.threadService = threadService;
    this.accountService = accountService;
    this.jwtUtil = jwtUtil;
  }

  /// Endpoints
  @GetMapping("/get/{forumId}")
  public ResponseEntity<List<Thread>> getThreads(@PathVariable Integer forumId) {

    // Return threads for forum
    var threads = threadService.getThreads(forumId);
    return ResponseEntity.ok().body(threads);
  }

  @PostMapping("/post")
  public ResponseEntity<Thread> postThread(@RequestHeader("Authorization") String bearerToken,
      @RequestBody Thread thread) {

    // Input sanitization

    // Check user exists
    var existingAccount = accountService.findById(thread.getAccountId());
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(null);
    }

    // Validate JWT
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(null);
    }
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    // Return threads for forum
    threadService.create(thread);
    return ResponseEntity.ok().body(thread);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteThread(@RequestHeader("Authorization") String bearerToken,
      @PathVariable Integer threadId) {

    // Get existing thread
    var thread = threadService.getThreadById(threadId);
    if (thread == null) {
      return ResponseEntity.status(409).header("server-error", "Thread does not exist").body(false);
    }

    // Validate JWT
    if (bearerToken == null) {
      return ResponseEntity.status(409).header("server-error", "Missing JTW").body(false);
    }
    var tokenUsername = jwtUtil.validateTokenAndGetUsername(bearerToken);

    // Check user exists
    var existingAccount = accountService.findByUsername(tokenUsername);
    if (existingAccount == null) {
      return ResponseEntity.status(409).header("server-error", "Account does not exist").body(false);
    }

    if (thread.getAccountId() != existingAccount.getAccountId()) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(false);
    }

    // Return threads for forum
    threadService.deleteThread(thread);
    return ResponseEntity.ok().body(true);
  }
}