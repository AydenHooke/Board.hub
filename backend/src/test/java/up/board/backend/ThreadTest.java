package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import up.board.backend.Controller.ThreadController;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Thread;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.ThreadRepository;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.ThreadService;
import up.board.backend.Utils.JwtUtil;

@SpringBootTest
@AutoConfigureTestDatabase
class ThreadTest {

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private ThreadRepository threadRepository;

  @InjectMocks
  private ThreadService threadService;

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountService accountService;

  private ThreadController threadController;

  @BeforeEach
  void setup() {
    this.threadController = new ThreadController(threadService, accountService, jwtUtil);
  }

  @Test
  void getThreads() {

    var forumId = 1;

    var nativeMap = new ArrayList<Map<String, Object>>();

    var thread0_native = new HashMap<String, Object>();
    thread0_native.put("account_id", 1);
    thread0_native.put("username", "test_user_0");
    thread0_native.put("content", "Test content 0");
    thread0_native.put("is_deleted", false);
    thread0_native.put("forum_id", forumId);
    thread0_native.put("thread_id", 1);
    thread0_native.put("title", "Test title 0");

    var thread1_native = new HashMap<String, Object>();
    thread1_native.put("account_id", 2);
    thread1_native.put("username", "test_user_1");
    thread1_native.put("content", "Test content 1");
    thread1_native.put("is_deleted", false);
    thread1_native.put("forum_id", forumId);
    thread1_native.put("thread_id", 2);
    thread1_native.put("title", "Test title 1");

    nativeMap.add(thread0_native);
    nativeMap.add(thread1_native);

    when(threadRepository.getThreadsByForumId(any(Integer.class))).thenReturn(nativeMap);

    //
    var response = threadController.getThreads(forumId);
    var responseThreads = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(2, responseThreads.size());
    assertEquals(1, responseThreads.get(0).getAccountId());
    assertEquals(2, responseThreads.get(1).getAccountId());

    verify(threadRepository).getThreadsByForumId(any(Integer.class));
  }

  @Test
  void postThread() {

    var thread = new Thread();
    thread.setForumId(1);
    thread.setAccountId(1);
    thread.setContent("Test thread content");
    thread.setTitle("Test thread title");

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test");

    var jwt = "Bearer test.jwt.test";

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(threadRepository.save(any(Thread.class))).thenReturn(thread);

    //
    var response = threadController.postThread(jwt, thread);
    var responseThread = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(1, responseThread.getAccountId());

    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(threadRepository).save(any(Thread.class));
  }

  @Test
  void postThread_nonExistingAccount() {

    var thread = new Thread();
    thread.setForumId(1);
    thread.setAccountId(1);
    thread.setContent("Test thread content");
    thread.setTitle("Test thread title");

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(null);
    //
    var response = threadController.postThread("", thread);
    var responseThread = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseThread);

    verify(accountRepository).findByAccountId(any(Integer.class));
  }

  @Test
  void postThread_nullJwt() {

    var thread = new Thread();
    thread.setForumId(1);
    thread.setAccountId(1);
    thread.setContent("Test thread content");
    thread.setTitle("Test thread title");

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test");

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);

    //
    var response = threadController.postThread(null, thread);
    var responseThread = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseThread);

    verify(accountRepository).findByAccountId(any(Integer.class));
  }
}
