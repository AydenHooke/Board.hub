package up.board.backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import up.board.backend.Entity.Rsvp;
import up.board.backend.Repository.RsvpRepository;

@Service
@Transactional
public class RsvpService {

    @Autowired
    private RsvpRepository rsvpRepository;

    public List<Rsvp> findByAccountId(int accountId) {
        return rsvpRepository.findByAccountId(accountId);
    }
    
    public Rsvp save(Rsvp rsvp) {
        return rsvpRepository.save(rsvp);
    }
}
