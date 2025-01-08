package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class GameVote {

  // Field values
  @Column
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int gameVoteId;

  @ManyToOne
  @JoinColumn(name = "account_id")
  Account account;

  @ManyToOne
  @JoinColumn(name = "game_id")
  Game game;

  int value;

  // Constructor
  public GameVote() {

  }
}
