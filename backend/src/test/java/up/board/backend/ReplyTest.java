package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import up.board.backend.Controller.ReplyController;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Reply;
import up.board.backend.Entity.Thread;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.ReplyRepository;
import up.board.backend.Repository.ThreadRepository;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.ReplyService;
import up.board.backend.Service.ThreadService;
import up.board.backend.Utils.JwtUtil;

@SpringBootTest
@AutoConfigureTestDatabase
class ReplyTest {

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private ReplyRepository replyRepository;

  @InjectMocks
  private ReplyService replyService;

  @Mock
  private ThreadRepository threadRepository;

  @InjectMocks
  private ThreadService threadService;

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountService accountService;

  private ReplyController replyController;

  @BeforeEach
  void setup() {
    this.replyController = new ReplyController(replyService, accountService, jwtUtil, threadService);
  }

  @Test
  void getReplies() {

    var threadId = 1;

    var reply0 = new Reply();
    reply0.setAccountId(1);
    reply0.setThreadId(1);
    reply0.setContent("Test description");
    var replyWithUsername0 = new ReplyRepository.ReplyWithUsername() {
      @Override
      public Reply getReply(){
        return reply0;
      }

      @Override
      public String getUsername(){
        return "test_user_0";
      }
    };

    var reply1 = new Reply();
    reply1.setAccountId(2);
    reply1.setThreadId(1);
    reply1.setContent("Test description");
    var replyWithUsername1 = new ReplyRepository.ReplyWithUsername() {
      @Override
      public Reply getReply(){
        return reply1;
      }

      @Override
      public String getUsername(){
        return "test_user_1";
      }
    };

    var replies = new ArrayList<ReplyRepository.ReplyWithUsername>();
    replies.add(replyWithUsername0);
    replies.add(replyWithUsername1);

    when(replyRepository.getReplyByThreadId(any(Integer.class))).thenReturn(replies);

    //
    var response = replyController.getReplies(threadId);
    var responseReplies = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(2, responseReplies.size());
    assertEquals(1, responseReplies.get(0).getAccountId());
    assertEquals(2, responseReplies.get(1).getAccountId());

    verify(replyRepository).getReplyByThreadId(any(Integer.class));
  }

  @Test
  void postReply() {

    var reply = new Reply();
    reply.setAccountId(1);
    reply.setContent("Test event 1");
    reply.setThreadId(1);

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test");

    var thread = new Thread();
    thread.setThreadId(1);

    var jwt = "Bearer test.jwt.test";

    when(threadRepository.getThreadByThreadId(any(Integer.class))).thenReturn(thread);
    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(replyRepository.save(any(Reply.class))).thenReturn(reply);

    //
    var response = replyController.postReply(jwt, reply);
    var responseReply = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(1, responseReply.getAccountId());

    verify(threadRepository).getThreadByThreadId(any(Integer.class));
    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(replyRepository).save(any(Reply.class));
  }

  @Test
  void postReply_replyToNullThread() {

    var reply = new Reply();
    reply.setAccountId(1);
    reply.setContent("Test event 1");
    reply.setThreadId(1);
    reply.setReplyToId(2);

    when(threadRepository.getThreadByThreadId(any(Integer.class))).thenReturn(null);

    //
    var response = replyController.postReply("", reply);
    var responseReply = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseReply);

    verify(threadRepository).getThreadByThreadId(any(Integer.class));
  }

  @Test
  void postReply_replyToNullReply() {

    var reply = new Reply();
    reply.setAccountId(1);
    reply.setContent("Test event 1");
    reply.setThreadId(1);
    reply.setReplyToId(2);

    var thread = new Thread();
    thread.setThreadId(1);

    when(threadRepository.getThreadByThreadId(any(Integer.class))).thenReturn(thread);
    when(replyRepository.getReplyByReplyId(any(Integer.class))).thenReturn(null);

    //
    var response = replyController.postReply("", reply);
    var responseReply = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseReply);

    verify(threadRepository).getThreadByThreadId(any(Integer.class));
    verify(replyRepository).getReplyByReplyId(any(Integer.class));
  }

  @Test
  void postReply_nullAccount() {

    var reply = new Reply();
    reply.setAccountId(1);
    reply.setContent("Test event 1");
    reply.setThreadId(1);

    var thread = new Thread();
    thread.setThreadId(1);

    when(threadRepository.getThreadByThreadId(any(Integer.class))).thenReturn(thread);
    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(null);

    //
    var response = replyController.postReply("", reply);
    var responseReply = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseReply);

    verify(threadRepository).getThreadByThreadId(any(Integer.class));
    verify(accountRepository).findByAccountId(any(Integer.class));
  }

}
