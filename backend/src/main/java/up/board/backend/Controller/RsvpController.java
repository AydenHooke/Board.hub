package up.board.backend.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import up.board.backend.Entity.Event;
import up.board.backend.Entity.Rsvp;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Service.RsvpService;
import up.board.backend.Enum.Event.Type;

@RestController
@RequestMapping("/rsvp")
@CrossOrigin(origins = "http://localhost:5174", exposedHeaders = "Authorization")
public class RsvpController {

    @Autowired
    private RsvpService rsvpService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private EventService eventService;

}

