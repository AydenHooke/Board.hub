package up.board.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import up.board.backend.Service.AccountService;
import up.board.backend.Service.EventService;
import up.board.backend.Service.RsvpService;

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

