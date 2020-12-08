from kafka import KafkaConsumer

# Create an instance of the Kafka consumer
consumer = KafkaConsumer('storego-events')
for msg in consumer:
    print("Topic name=%s, Message=%s"%(msg.topic,msg.value))