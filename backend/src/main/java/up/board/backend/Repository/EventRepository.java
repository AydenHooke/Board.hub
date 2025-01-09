package up.board.backend.Repository;

import up.board.backend.Entity.Event;
import up.board.backend.Enum.Event.Type;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
  public interface EventWithUsername {
    public Event getEvent();
    public String getUsername();
  }

  @Query(value = "SELECT e AS event, a.username AS username FROM Event e JOIN Account a ON (e.accountId = a.accountId) WHERE e.eventId = ?1")
  public EventWithUsername findByEventId(Integer eventId);

  public List<Event> findAllByType(Type type);

  @Query(value = "SELECT e as event, a.username AS username FROM Event e JOIN Account a ON (e.accountId = a.accountId)")
  public List<EventWithUsername> findAllPlusUsername();

  //@Query(value = "SELECT e as event, a.username AS username FROM Event e JOIN Account a ON (e.accountId = a.accountId) WHERE a.accountId = ?1")
  //public List<EventWithUsername> findAllByAccountIdPlusUsername(Integer accountId);

  @Query(value = "SELECT e as event, (SELECT a0.username FROM Account a0 WHERE a0.accountId = e.accountId) AS username FROM Account a JOIN a.events ae JOIN Event e ON (e.eventId = ae.eventId) WHERE a.accountId = ?1")
  public List<EventWithUsername> findAllJoinedEventsPlusUsername(Integer accountId);
}
