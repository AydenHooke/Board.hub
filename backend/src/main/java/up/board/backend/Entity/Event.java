package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import up.board.backend.Enum.Event.Status;
import up.board.backend.Enum.Event.Type;

@Entity
@Table
@Data
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
  @Enumerated(EnumType.STRING)
  Status status;

  @Column(name = "date_created")
  LocalDateTime dateCreated;

  @Column(name = "date_meet")
  LocalDateTime dateMeet;

  @Column
  @Enumerated(EnumType.STRING)
  Type type;

  @JoinColumn(name = "account_id")
  Integer accountId;

  @JoinColumn(name = "game_id", nullable = true)
  Integer gameId;

  @ManyToMany(mappedBy = "events")
  @JsonBackReference
  List<Account> accounts;


  // Constructor
  public Event() {

  }
}
