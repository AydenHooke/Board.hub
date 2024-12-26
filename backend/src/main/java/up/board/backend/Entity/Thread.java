package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Thread {

  // Field values
  @Column(name = "thread_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int threadId;

  @Column
  String title;

  @Column
  String content;

  @JoinColumn(name = "account_id")
  int accountId;

  @JoinColumn(name = "forum_id")
  int forumId;

  // Constructor
  public Thread() {

  }
}
