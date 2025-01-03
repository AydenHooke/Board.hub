package up.board.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import up.board.backend.Controller.ForumController;
import up.board.backend.Entity.Forum;
import up.board.backend.Repository.ForumRepository;
import up.board.backend.Service.ForumService;

@SpringBootTest
@AutoConfigureTestDatabase
class ForumTest {


  @Mock
  private ForumRepository forumRepository;

  @InjectMocks
  private ForumService forumService;

  private ForumController forumController;

  @BeforeEach
  void setup() {
    this.forumController = new ForumController(forumService);
  }

  @Test
  void getForums() {

    var forum0 = new Forum();
    forum0.setForumId(1);
    forum0.setTitle("Test title 1");
    forum0.setDescription("Test desc");
    forum0.setType("N/A");

    var forum1 = new Forum();
    forum1.setForumId(2);
    forum1.setTitle("Test title 2");
    forum1.setDescription("Test desc");
    forum1.setType("N/A");

    var forums = new ArrayList<Forum>();
    forums.add(forum0);
    forums.add(forum1);

    when(forumRepository.findAll()).thenReturn(forums);

    //
    var response = forumController.getForums();
    var responseForums = response.getBody();

    assertEquals(200, response.getStatusCode().value());
    assertEquals(2, responseForums.size());
    assertEquals(1, responseForums.get(0).getForumId());
    assertEquals(2, responseForums.get(1).getForumId());

    verify(forumRepository).findAll();
  }

}
