package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Forum {

  // Field values
  @Column(name = "forum_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int forumId;

  @Column
  String title;

  @Column
  String description;

  @Column
  String type;

  // Constructor
  public Forum() {

  }
}
