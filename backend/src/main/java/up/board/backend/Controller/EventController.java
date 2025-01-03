package up.board.backend.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Event;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Enum.Event.Status;
import up.board.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5174")
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

  @GetMapping("/{id}")
  public ResponseEntity<Event> getEvent(@PathVariable Integer id) {

    // Return event
    var event = eventService.getById(id);
    return ResponseEntity.ok().body(event);
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
    if(dateTime == null){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("server-error", "Missing date meet").body(null);
    }

    // Return error if title or content is empty
    if (title == null || title.isBlank() || content == null || content.isBlank()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).header("server-error", "Blank title or content").body(null);
    }

    // Set default values
    event.setDateMeet(dateTime);
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
    if (!tokenUsername.equals(existingAccount.getUsername())) {
      return ResponseEntity.status(401).header("server-error", "Invalid JTW").body(null);
    }

    // Return threads for forum
    var createdEvent = eventService.create(event);
    return ResponseEntity.ok().body(createdEvent);
  }

}