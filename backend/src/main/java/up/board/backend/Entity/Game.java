package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Game {

  // Field values
  @Column(name = "game_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int gameId;

  @Column
  String title;

  @Column
  String description;

  @Column
  float price;

  // Constructor
  public Game() {

  }
}
