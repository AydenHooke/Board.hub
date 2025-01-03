package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import up.board.backend.Controller.EventController;
import up.board.backend.Entity.Account;
import up.board.backend.Entity.Event;
import up.board.backend.Repository.AccountRepository;
import up.board.backend.Repository.EventRepository;
import up.board.backend.Repository.ThreadRepository;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Utils.JwtUtil;

@SpringBootTest
@AutoConfigureTestDatabase
class EventTest {

  @Mock
  private JwtUtil jwtUtil;

  @Mock
  private EventRepository eventRepository;

  @InjectMocks
  private EventService eventService;

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountService accountService;

  private EventController eventController;

  @BeforeEach
  void setup() {
    this.eventController = new EventController(eventService, accountService, jwtUtil);
  }

  @Test
  void getEvents() {

    var event0 = new Event();
    event0.setAccountId(1);
    event0.setTitle("Test event 1");
    event0.setContent("Test description");
    var eventWithUsername0 = new EventRepository.EventWithUsername() {
      @Override
      public Event getEvent() {
        return event0;
      }

      @Override
      public String getUsername() {
        return "test_user_0";
      }
    };

    var event1 = new Event();
    event1.setAccountId(2);
    event1.setTitle("Test event 2");
    event1.setContent("Test description");
    var eventWithUsername1 = new EventRepository.EventWithUsername() {
      @Override
      public Event getEvent() {
        return event1;
      }

      @Override
      public String getUsername() {
        return "test_user_1";
      }
    };

    var events = new ArrayList<EventRepository.EventWithUsername>();
    events.add(eventWithUsername0);
    events.add(eventWithUsername1);

    when(eventRepository.findAllPlusUsername()).thenReturn(events);

    //
    var response = eventController.getEvents();
    var responseEvents = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(2, responseEvents.size());
    assertEquals(1, responseEvents.get(0).getAccountId());
    assertEquals(2, responseEvents.get(1).getAccountId());

    verify(eventRepository).findAllPlusUsername();
  }

  @Test
  void getEvent() {

    var event = new Event();
    event.setAccountId(1);
    event.setTitle("Test event 1");
    event.setContent("Test description");

    when(eventRepository.findByEventId(any(Integer.class))).thenReturn(event);

    //
    var response = eventController.getEvent(1);
    var responseEvent = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(1, responseEvent.getAccountId());

    verify(eventRepository).findByEventId(any(Integer.class));
  }

  @Test
  void postEvent() {

    var event = new Event();
    event.setAccountId(1);
    event.setTitle("Test event 1");
    event.setContent("Test description");
    event.setDateMeet(LocalDateTime.now());

    var account = new Account();
    account.setAccountId(1);
    account.setUsername("test");

    var jwt = "Bearer test.jwt.test";

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(account);
    when(jwtUtil.validateTokenAndGetUsername(any(String.class))).thenReturn(account.getUsername());
    when(eventRepository.save(any(Event.class))).thenReturn(event);

    //
    var response = eventController.postEvent(jwt, event);
    var responseEvent = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(1, responseEvent.getAccountId());

    verify(accountRepository).findByAccountId(any(Integer.class));
    verify(jwtUtil).validateTokenAndGetUsername(any(String.class));
    verify(eventRepository).save(any(Event.class));
  }

  @Test
  void postEvent_nullDateMeet() {

    var event = new Event();
    event.setAccountId(1);
    event.setContent("Test description");

    //
    var response = eventController.postEvent("", event);
    var responseEvent = response.getBody();

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals(null, responseEvent);
  }

  @Test
  void postEvent_nullTitle() {

    var event = new Event();
    event.setAccountId(1);
    event.setContent("Test description");
    event.setDateMeet(LocalDateTime.now());

    //
    var response = eventController.postEvent("", event);
    var responseEvent = response.getBody();

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    assertEquals(null, responseEvent);
  }

  @Test
  void postEvent_invalidAccount() {

    var event = new Event();
    event.setAccountId(1);
    event.setTitle("Test event 1");
    event.setContent("Test description");
    event.setDateMeet(LocalDateTime.now());

    when(accountRepository.findByAccountId(any(Integer.class))).thenReturn(null);

    //
    var response = eventController.postEvent("", event);
    var responseEvent = response.getBody();

    assertEquals(409, response.getStatusCode().value());
    assertEquals(null, responseEvent);

    verify(accountRepository).findByAccountId(any(Integer.class));
  }

}
