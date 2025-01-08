package up.board.backend.Repository;

import up.board.backend.Entity.Game;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    public Game findGameByBggId(int bggId);
    public Game findGameByGameId(int gameId);
    public List<Game> findGamesByGameIdNotNull();
    public Game findGameByTitle(String name);

    @Query(value = "SELECT Game.* FROM Game INNER JOIN Game_Collection ON Game_Collection.game_id = Game.game_Id WHERE Game_Collection.account_id = ?1", nativeQuery = true)
    public List<Game> findGamesByCollection(int account_id);
}
