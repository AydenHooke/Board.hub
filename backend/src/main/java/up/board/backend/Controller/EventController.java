package up.board.backend.Controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
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

import up.board.backend.Entity.Account;
import up.board.backend.Entity.Event;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Enum.Event.Status;
import up.board.backend.Enum.Event.Type;
import up.board.backend.Utils.JwtUtil;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {

  private static final Logger logger = LoggerFactory.getLogger(EventController.class);

  EventService eventService;

  JwtUtil jwtUtil;

  AccountService accountService;

  public EventController(EventService eventService, AccountService accountService, JwtUtil jwtUtil) {
    this.eventService = eventService;
    this.accountService = accountService;

    this.jwtUtil = jwtUtil;
  }

  /// Endpoints
  @GetMapping("/")
  public ResponseEntity<List<Event>> getEvents() {

    // Return event
    var events = eventService.getAll();
    return ResponseEntity.ok().body(events);
  }

  /// Endpoints
  @GetMapping("/unadded/{accountId}")
  public ResponseEntity<List<Event>> getUnAddedEvents(@PathVariable Integer accountId, @RequestParam Type type) {
    var existingAccount = accountService.findById(accountId);

    if (existingAccount == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Invalid account id").body(null);
    }

    // Return event
    var events = eventService.getAll();

    // Filter out events that are already added
    events.removeIf(event -> existingAccount.getEvents().contains(event) || event.getType() != type || event.getStatus().equals(Status.COMPLETED));

    return ResponseEntity.ok().body(events);
  }

  @GetMapping("/id/{id}")
  public ResponseEntity<Event> getEvent(@PathVariable Integer id) {

    // Check if event exists
    var event = eventService.findById(id);
    if(event == null){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Invalid event id").body(null);
    }

    return ResponseEntity.ok().body(event);
  }

  @GetMapping("/id/{id}/participants")
  public ResponseEntity<List<Account>> getAccountsById(@PathVariable Integer id) {

    // Check if event exists
    var event = eventService.findById(id);
    if(event == null){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Invalid event id").body(null);
    }

    // Return event
    List<Account> participants = eventService.findAccountsByEventId(id);
    return ResponseEntity.ok().body(participants);
  }

  @PostMapping("/")
  public ResponseEntity<Event> postEvent(@RequestHeader("Authorization") String bearerToken,
      @RequestBody Event event) {

    // Input sanitization
    var title = event.getTitle();
    var content = event.getContent();

    LocalDateTime dateTime;

    // Validate the 'time' parameter
    try {
      dateTime = event.getDateMeet();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("server-error", "Invalid Date syntax").body(null);
    }
    if (dateTime == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("server-error", "Missing date meet").body(null);
    }

    // Return error if title or content is empty
    if (title == null || title.isBlank() || content == null || content.isBlank()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("server-error", "Blank title or content").body(null);
    }

    // Set default values
    event.setDateMeet(dateTime);
    event.setDateCreated(LocalDateTime.now());
    event.setStatus(Status.SCHEDULED);

    // Check user exists
    var existingAccount = accountService.findById(event.getAccountId());
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
    var createdEvent = eventService.save(event);
    return ResponseEntity.ok().body(createdEvent);
  }

  @GetMapping("/{type}")
  public ResponseEntity<List<Event>> getEventsByType(@RequestParam Type type) {
    if (type == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Type parameter is required").body(null);
    }

    List<Event> events = eventService.getAllByType(type);
    return ResponseEntity.ok().body(events);
  }

  @PostMapping("/account/{accountId}")
  public ResponseEntity<Account> storeEventToAccount(@PathVariable Integer accountId, @RequestBody Event event) {

    var existingEvent = eventService.findById(event.getEventId());
    if (existingEvent == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Invalid event id: " + event.getEventId())
          .body(null);
    }

    var existingAccount = accountService.findById(accountId);
    if (existingAccount == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Missing account").body(null);
    }

    if (existingAccount.getEvents().contains(existingEvent)) {
      return ResponseEntity.status(HttpStatus.CONFLICT).header("error", "Event already associated with account")
          .body(null);
    }

    existingAccount.getEvents().add(existingEvent);
    accountService.save(existingAccount);

    return ResponseEntity.ok().body(existingAccount);
  }

  @GetMapping("/account/{accountId}")
  public ResponseEntity<List<Event>> getEventsForAccount(@PathVariable Integer accountId, @RequestParam Type type) {

    var existingAccount = accountService.findById(accountId);

    if (existingAccount == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Missing account").body(null);
    }

    var events = eventService.getAllByAccountId(accountId);
    var filteredEvents = events.stream()
        .filter(event -> event.getType() == type)
        .toList();

    return ResponseEntity.ok().body(filteredEvents);
  }

  @DeleteMapping("/account/{accountId}/event/{eventId}")
  public ResponseEntity<Event> deleteEventFromAccount(@PathVariable Integer accountId, @PathVariable Integer eventId) {

    var existingEvent = eventService.findById(eventId);
    if (existingEvent == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Invalid event id: " + eventId).body(null);
    }

    var existingAccount = accountService.findById(accountId);
    if (existingAccount == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("error", "Missing account").body(null);
    }

    if (!existingAccount.getEvents().contains(existingEvent)) {
      return ResponseEntity.status(HttpStatus.CONFLICT).header("error", "Event not associated with account").body(null);
    }

    // Delete the event if it is associated with this account
    if (existingAccount.getAccountId() == existingEvent.getAccountId()) {

      for(var account : existingEvent.getAccounts()){
        account.getEvents().remove(existingEvent);
        accountService.save(account);
      }
      existingEvent.setAccounts(new ArrayList<Account>());

      eventService.save(existingEvent);

      var deletedEvent = eventService.delete(existingEvent);
      return ResponseEntity.ok().body(deletedEvent);
    }

    // Remove the association
    existingAccount.getEvents().remove(existingEvent);
    existingEvent.getAccounts().remove(existingAccount);

    accountService.save(existingAccount);
    eventService.save(existingEvent);

    return ResponseEntity.ok().body(existingEvent);
  }
}