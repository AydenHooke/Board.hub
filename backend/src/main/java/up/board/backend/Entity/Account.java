package up.board.backend.Entity;

import jakarta.persistence.*;
import lombok.*;

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
  String role;

  // Constructor
  public Account() {

  }
}
