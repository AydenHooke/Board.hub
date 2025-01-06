
import kafka from 'kafka-node';

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});

export default function KafkaTest() {

  return (
    <>
      Kafka test...
    </>
  );
}