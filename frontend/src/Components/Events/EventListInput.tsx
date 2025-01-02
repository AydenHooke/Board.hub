interface EventListInputProps {
    eventType: string,
}

function EventListInput({eventType}: EventListInputProps) {
  return (
    <div>EventListInput {eventType}</div>
  )
}

export default EventListInput