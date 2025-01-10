package up.board.backend.Kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

  @Bean
  public NewTopic topic() {
    return TopicBuilder.name("test")
        .partitions(10)
        .replicas(1)
        .build();
  }

  @KafkaListener(id = "myId", topics = "test")
  public void listen(String in) {
    System.out.println(in);
  }

}
