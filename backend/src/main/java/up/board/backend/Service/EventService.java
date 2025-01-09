package up.board.backend.Service;

import java.util.ArrayList;
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

  public Event create(Event event) {
    return eventRepository.save(event);
  }

  public Event findById(int eventId) {
    var eventDTO =  eventRepository.findByEventId(eventId);
    var event = eventDTO.getEvent();
    event.setUsername(eventDTO.getUsername());
    return event;
  }

  public List<Event> getAll() {
    var eventDTOs = eventRepository.findAllPlusUsername();

    var eventList = new ArrayList<Event>();
    for (var dto : eventDTOs) {
      var event = dto.getEvent();
      event.setUsername(dto.getUsername());
      eventList.add(event);
    }

    return eventList;
  }

  public List<Event> getAllByAccountId(Integer accountId) {
    var eventJoinedDTOs = eventRepository.findAllJoinedEventsPlusUsername(accountId);

    var eventList = new ArrayList<Event>();
    for (var dto : eventJoinedDTOs) {
      var event = dto.getEvent();
      event.setUsername(dto.getUsername());
      eventList.add(event);
    }

    return eventList;
  }

  public List<Event> getAllByType(Type type) {
    return eventRepository.findAllByType(type);
  }

  public Event delete(Event event) {
    eventRepository.delete(event);
    return event;
  }

}