import { useEffect, useState} from 'react'
import EventListInput from './EventListInput';
import axios from 'axios';
import { useAccount } from '../../Context/useAccount';
import { Event } from '../../Types/Event';
import { authorizationHander } from '../Home/Logout';

function EventListLogic() {
    const queryParams = new URLSearchParams(location.search);
    const eventType = queryParams.get('type');
    const [events, setEvents] = useState([]);
    const {id : contextId} = useAccount();

    useEffect(() => {

        // Call filetered events when logged in
        if(contextId){
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
                authorizationHander(error);
            });
        }

        // Call all events when not logged in
        else{
            axios.get(`http://localhost:8080/event/`, {
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
        }
    }, [eventType, contextId]);


    const handleAddEvent = (event: Event) => {
        axios.post(`http://localhost:8080/event/account/${contextId}`, event)
        .then(response => {
            console.log(response.data);
            console.log("Event Added");
            setEvents(events.filter((e: Event) => e.eventId !== event.eventId));
        })
        .catch(error => {
            console.log(error);
            authorizationHander(error);
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