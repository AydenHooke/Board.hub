package up.board.backend.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import up.board.backend.Entity.Event;
import up.board.backend.Repository.EventRepository;

@Service
public class EventService {

  EventRepository eventRepository;

  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public Event create(Event event){
    return eventRepository.save(event);
  }

  public Event getById(int eventId){
    return eventRepository.findByEventId(eventId);
  }

  public List<Event> getAll() {
    return eventRepository.findAll();
  }

}