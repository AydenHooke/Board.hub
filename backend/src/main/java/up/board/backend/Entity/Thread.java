package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Thread {

  // Field values
  @Column
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int threadId;

  @Column
  String title;

  @Column
  String content;

  @JoinColumn
  int accountId;

  @Transient
  String username;

  @JoinColumn
  int forumId;

  @Column
  boolean isDeleted;

  // Constructor
  public Thread() {

  }
}
