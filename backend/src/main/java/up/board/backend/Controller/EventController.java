package up.board.backend.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Event;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Enum.Event.Status;
import up.board.backend.Enum.Event.Type;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5174")
public class EventController {

  private static final Logger logger = LoggerFactory.getLogger(EventController.class);

  @Autowired
  EventService eventService;

  @Autowired
  AccountService accountService;

  // //
  // public EventController(EventService eventService) {
  //   this.eventService = eventService;
  // }

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
  public ResponseEntity<Event> postEvent(@RequestBody Event event) {

    // Input sanitization
    var title = event.getTitle();
    var content = event.getContent();

    // Return error if title or content is empty
    if (title == null || title.isBlank() || content == null || content.isBlank()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    //Check if id matches a user
    var accountId = event.getAccountId();
    if (accountId == null || accountService.findById(accountId) == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    // Set default values
    event.setStatus(Status.SCHEDULED);
    // event.setType(event.getType().equals("MEETUP") ? Type.MEETING : Type.TOURNAMENT);
    
    


    // Return threads for forum
    var createdEvent = eventService.create(event);
    return ResponseEntity.ok().body(createdEvent);
  }


}