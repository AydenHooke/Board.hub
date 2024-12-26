package up.board.backend.Repository;

import up.board.backend.Entity.GameCollection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameCollectionRepository extends JpaRepository<GameCollection, Integer> {

}
