import { useEffect, useState } from 'react'
import EventPageInput from './EventPageInput'
import { Event } from '../../Types/Event';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventPageLogic() {

    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        console.log('EventPageLogic');
        async function getEvent(eventId: string) {
            try{
                const response = await axios.get(`http://localhost:8080/event/id/${eventId}`);
                const data = response.data;
                setEvent(data);
            }
            catch(error) {
                console.log(error);
            }
        }
        if (eventId) {
            getEvent(eventId);
        }
    }, [eventId])


  return (
    <>
      {event && <EventPageInput event={event} />}
      {!event && <div>Event not found</div>}
    </>
  )
}

export default EventPageLogic