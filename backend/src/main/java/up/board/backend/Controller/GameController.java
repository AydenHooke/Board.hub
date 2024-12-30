package up.board.backend.Controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import up.board.backend.Entity.Account;
import up.board.backend.Service.AccountService;
import up.board.backend.Service.GameService;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:5174")

public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    AccountService accountService;
    GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
      }

    @PostMapping("/validateGamePersistence")
    public ResponseEntity<?> validateGamePersistence(@RequestBody List<String> gameIds) {
        System.out.println("I have been called");
        List<String> gameIdsNotPersisted = gameService.returnIfNotPersisted(gameIds); // this returns a list of every ID we don't have a game for
        if(gameIdsNotPersisted != null){ // i.e. if there wasn't an error, return the gameIds as requested
        System.out.println("Body out");
            return ResponseEntity.status(HttpStatus.OK)
            .body(gameIdsNotPersisted);
    }
        else{
            System.out.println("Error dammit");
            return ResponseEntity.status(HttpStatus.CONFLICT)
            .build(); // if there was an error, report a conflict 
        }}
}
