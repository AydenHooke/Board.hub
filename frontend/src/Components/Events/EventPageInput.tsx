import { Link } from 'react-router-dom';
import { Event } from '../../Types/Event';

interface EventPageInputProps {

    event: Event | null;

}

function EventPageInput({ event }: EventPageInputProps) {
  return (
    <div className='event-page'>
        <h1 className='event-page-title'>{event?.title}</h1>
        <h3 className='event-page-username'>By: <Link to={`/account/${event?.accountId}`}>{event?.username}</Link></h3>
        <h3 className='event-page-content'>Description: {event?.content}</h3>
        <h3 className='event-page-date'>Date: {event?.dateMeet?.toString()}</h3>
        <h3 className='event-page-status'>Status: {event?.status}</h3>
        <h3 className='event-page-type'>Type: {event?.type}</h3>
    </div>

  )
}

export default EventPageInput