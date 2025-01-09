import { useEffect, useState } from 'react'
import EventPageInput from './EventPageInput'
import { Event } from '../../Types/Event';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Account } from '../../Types/Account';

function EventPageLogic() {

    const { eventId } = useParams<{ eventId: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [participants, setParticipants] = useState<Account[]>([]);

    useEffect(() => {
        console.log('EventPageLogic');
        async function getEventAndParticipants(eventId: string) {
            try{
                let response = await axios.get(`http://localhost:8080/event/id/${eventId}`);
                let data = response.data;
                setEvent(data);

                response = await axios.get(`http://localhost:8080/event/id/${eventId}/participants`);
                data = response.data;
                setParticipants(data)
            }
            catch(error) {
                console.log(error);
            }
        }
        if (eventId) {
            getEventAndParticipants(eventId);
        }
    }, [eventId])


  return (
    <>
      {event && <EventPageInput event={event} participants={participants}/>}
      {!event && <div>Event not found</div>}
    </>
  )
}

export default EventPageLogic