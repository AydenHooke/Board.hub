package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class GameCollection {

  // Field values
  @Column(name = "game_collection_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int gameCollectionId;

  @JoinColumn(name = "account_id")
  int accountId;

  @JoinColumn(name = "game_id")
  int gameId;

  // Constructor
  public GameCollection() {

  }
}
