package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Game {

  // Field values
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int gameId;

  @Column
  Integer bggId;

  @Column
  String gameImageUrl;

  @Column
  String title;

  @Column(length = 25565)
  String description;

  @Column
  Float price;

  @Column
  int rating;



  // Constructor
  public Game() {

  }
}
