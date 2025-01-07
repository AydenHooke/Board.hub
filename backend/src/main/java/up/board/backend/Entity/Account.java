package up.board.backend.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

import up.board.backend.Enum.Account.Role;

@Entity
@Table
@Data
public class Account {

  // Field values
  @Column(name = "account_id")
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int accountId;

  @Column
  String username;

  @Column(name = "password_hash")
  String passwordHash;

  @Column
  String email;

  @Column
  String address;

  @Column(name = "bgg_account")
  String bggAccount;

  @Column
  @Enumerated(EnumType.STRING)
  Role role;

  @ManyToMany
  @JoinTable(
    name = "account_event",
    joinColumns = @JoinColumn(name = "account_id"),
    inverseJoinColumns = @JoinColumn(name = "event_id"),
    uniqueConstraints = @UniqueConstraint(columnNames = {"account_id", "event_id"})
  )
  @JsonBackReference
  List<Event> events;

  // Constructor
  public Account() {

  }
}
