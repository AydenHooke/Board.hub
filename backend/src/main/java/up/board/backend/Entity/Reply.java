package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Reply {

  // Field values
  @Column(name = "reply_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int replyId;

  @Column
  String content;

  @JoinColumn(name = "thread_id")
  int threadId;

  @JoinColumn(name = "reply_to_id")
  Integer replyToId;

  @JoinColumn(name = "account_id")
  int accountId;

  // Constructor
  public Reply() {

  }
}
