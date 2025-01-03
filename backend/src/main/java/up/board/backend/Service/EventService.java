package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Event;
import up.board.backend.Repository.EventRepository;
import up.board.backend.Enum.Event.Type;

@Service
public class EventService {

  EventRepository eventRepository;

  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public Event create(Event event){
    return eventRepository.save(event);
  }

  public Event findById(int eventId){
    return eventRepository.findByEventId(eventId);
  }

  public List<Event> getAll() {
    return eventRepository.findAll();
  }

  public List<Event> getAllByType(Type type) {
    return eventRepository.findAllByType(type);
  }

}