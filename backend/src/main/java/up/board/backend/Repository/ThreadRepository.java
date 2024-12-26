package up.board.backend.Repository;

import up.board.backend.Entity.Thread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Integer> {

}
