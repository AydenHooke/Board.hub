package up.board.backend.Repository;

import up.board.backend.Entity.Rsvp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RsvpRepository extends JpaRepository<Rsvp, Integer> {

}