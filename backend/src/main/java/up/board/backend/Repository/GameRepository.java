package up.board.backend.Repository;

import up.board.backend.Entity.Game;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    public Game findGameByBggId(int bggId);
    public Game findGameByGameId(int gameId);
    public List<Game> findGamesByGameIdNotNull();
    public Game findGameByTitle(String name);
}
