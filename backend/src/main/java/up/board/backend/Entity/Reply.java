package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
public class Reply {

  // Field values
  @Column(name = "reply_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int replyId;

  @Column
  String content;

  @JoinColumn(name = "reply_to_thread_id")
  int replyToThreadId;

  @JoinColumn(name = "reply_to_reply_id")
  int replyToReplyId;

  @JoinColumn(name = "account_id")
  int accountId;

  // Constructor
  public Reply() {

  }
}
