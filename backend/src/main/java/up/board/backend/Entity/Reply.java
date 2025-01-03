package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Reply {

  // Field values
  @Column
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int replyId;

  @Column
  String content;

  @JoinColumn
  int threadId;

  @JoinColumn(nullable = true)
  Integer replyToId;

  @JoinColumn
  int accountId;

  @Transient
  String username;

  @Column
  boolean isDeleted;

  // Constructor
  public Reply() {

  }
}
