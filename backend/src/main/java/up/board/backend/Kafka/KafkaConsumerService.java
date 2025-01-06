package up.board.backend.Kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;

/*public class KafkaConsumerService {



    @KafkaListener(id = "myId", topics = "test")
    public void listen(String in) {
        System.out.println(in);
    }

}*/
