import { useAccount } from '../../Context/useAccount';
import { Event } from '../../Types/Event';


interface EventListInputProps {
    eventType: string,
    events: Event[],
    handleAddEvent: (event: Event) => void
}

function EventListInput({eventType, events, handleAddEvent}: EventListInputProps) {
  const {id : contextId} = useAccount();

  return (
    <>
      <div>EventListInput {eventType}</div>
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>
            <h3>Title: {event.title}</h3>
            <p>Account ID: {event.accountId}</p>
            <p>Description: {event.content}</p>
            <p>Status: {event.status}</p>
            {contextId && (<button onClick={() => handleAddEvent(event)}>Add Event</button>)}
          </li>
        ))}
      </ul>
    </>
  )
}

export default EventListInput