package up.board.backend.Repository;

import up.board.backend.Entity.Event;
import up.board.backend.Enum.Event.Type;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

  public Event findByEventId(Integer eventId);

  public List<Event> findAllByType(Type type);

  public interface EventWithUsername {
    public Event getEvent();
    public String getUsername();
  }
  @Query(value = "SELECT e as event, a.username AS username FROM Event e JOIN Account a ON (e.accountId = a.accountId)")
  public List<EventWithUsername> findAllPlusUsername();
}
