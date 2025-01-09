package up.board.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import up.board.backend.Entity.Event;
import up.board.backend.Enum.Event.Status;
import up.board.backend.Repository.EventRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventStatusUpdaterService {

    @Autowired
    private EventRepository eventRepository;

    @Scheduled(fixedRate = 60000) // Run every minute
    public void updateEventStatuses() {
        List<Event> events = eventRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (Event event : events) {
            if (event.getDateMeet().isBefore(now) && event.getStatus() != Status.COMPLETED) {
                event.setStatus(Status.COMPLETED);
                eventRepository.save(event);
            }
        }
    }
}