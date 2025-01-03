import { useEffect, useState} from 'react'
import EventListInput from './EventListInput';
import axios from 'axios';
import { useAccount } from '../../Context/useAccount';
import { Event } from '../../Types/Event';

function EventListLogic() {
    const queryParams = new URLSearchParams(location.search);
    const eventType = queryParams.get('type');
    const [events, setEvents] = useState([]);
    const {id : contextId} = useAccount();

    useEffect(() => {
        axios.get(`http://localhost:8080/event/unadded/${contextId}`, {
            params: {
                type: eventType
            }
        })
        .then(response => {
            console.log(response.data);
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [eventType]);


    const handleAddEvent = (event: Event) => {
        axios.post(`http://localhost:8080/event/account/${contextId}`, event)
        .then(response => {
            console.log(response.data);
            console.log("Event Added");
            setEvents(events.filter((e: Event) => e.eventId !== event.eventId));
        })
        .catch(error => {
            console.log(error);
        });
    }

  return (
    <>
        <div>{eventType === "MEETING" && <EventListInput eventType={eventType} events={events} handleAddEvent={handleAddEvent}/>}</div>
        <div>{eventType === "TOURNAMENT" && <EventListInput eventType={eventType} events={events} handleAddEvent={handleAddEvent}/>}</div>
    </>
  )
}

export default EventListLogic