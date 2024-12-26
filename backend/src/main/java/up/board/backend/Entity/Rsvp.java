package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Data
public class Rsvp {

  // Field values
  @Column(name = "rsvp_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int rsvpId;

  @JoinColumn(name = "account_id")
  int accountId;

  @JoinColumn(name = "event_id")
  int eventId;

  // Constructor
  public Rsvp() {

  }
}
