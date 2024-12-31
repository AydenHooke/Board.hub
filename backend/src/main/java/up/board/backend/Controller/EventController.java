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

import up.board.backend.Entity.Event;
import up.board.backend.Service.EventService;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5174")
public class EventController {

  private static final Logger logger = LoggerFactory.getLogger(EventController.class);

  EventService eventService;

  //
  public EventController(EventService eventService) {
    this.eventService = eventService;
  }

  /// Endpoints
  @GetMapping("/get")
  public ResponseEntity<List<Event>> getEvents() {

    // Return event
    var events = eventService.getAll();
    return ResponseEntity.ok().body(events);
  }

  @GetMapping("/get/{id}")
  public ResponseEntity<Event> getEvent(@PathVariable Integer id) {

    // Return event
    var event = eventService.getById(id);
    return ResponseEntity.ok().body(event);
  }

  @PostMapping("/post")
  public ResponseEntity<String> postEvent(@RequestBody Event event) {

    // Input sanitization

    // Return threads for forum
    eventService.create(event);
    return ResponseEntity.ok().body("Created");
  }


}