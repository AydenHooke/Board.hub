package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
public class Event {

  // Field values
  @Column(name = "event_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int eventId;

  @Column
  String title;

  @Column
  String content;

  @Column
  String status;

  @Column(name = "date_created")
  LocalDateTime dateCreated;

  @Column(name = "date_meet")
  LocalDateTime dateMeet;

  @Column
  String type;

  @JoinColumn(name = "account_id")
  int accountId;

  @JoinColumn(name = "game_id")
  int gameId;

  // Constructor
  public Event() {

  }
}