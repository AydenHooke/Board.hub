import { Account } from '../../Types/Account';
import { Event } from '../../Types/Event';
import  imageUrl from '../../Images/bat.png';
import { Link } from 'react-router-dom';


interface EventPageInputProps {

    event: Event | null;
    participants: Account[];

}

function EventPageInput({ event, participants }: EventPageInputProps) {
  return (
    <>
      <section className='event-page'>
          <h1 className='event-page-title'>{event?.title}</h1>
          <h3 className='event-page-username'>By: {event?.username}</h3>
          <h3 className='event-page-content'>Description: {event?.content}</h3>
          <h3 className='event-page-date'>Date: {event?.dateMeet?.toString()}</h3>
          <h3 className='event-page-status'>Status: {event?.status}</h3>
          <h3 className='event-page-type'>Type: {event?.type}</h3>
      </section>
      <section>
          <h2>Participants</h2>
          <ul className='participant-list'>
            {participants.map((participant) => (
              <li className='event-participant'>
                <img className="circle participant-image" src={imageUrl} alt="Blue bat hanging upside down" />
                <h3><Link to={`/account/${participant.accountId}`}>{participant.username}</Link></h3> 
                <p>Role: {participant.role ? participant.role : "N/A"}</p>
              </li>
            ))}
          </ul>
      </section>
    </>

  )
}

export default EventPageInput