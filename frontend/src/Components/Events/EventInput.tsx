import { useAccount } from '../../Context/useAccount'
import {Event} from '../../Types/Event'


interface EventInputProps {
  handleEventAdd: (eventName: string) => void
  handleFindEvents: (eventName: string) => void
  handleLeaveEvent: (event: Event, type: string) => void
  myMeetings: Event[]
  myTournaments: Event[]
}

function EventInput({handleFindEvents, handleEventAdd, handleLeaveEvent, myMeetings, myTournaments}: EventInputProps) {
  const {id : contextId} = useAccount();
  return (
    <>
        <section className='meetups'>
            <h2>My Meetups</h2>
            <ul>
               {myMeetings.map((meeting) => (
                <li>
                    <h3>Title: {meeting.title}</h3>
                    <p>Event ID: {meeting.eventId}</p>
                    <p>Description: {meeting.content}</p>
                    <p>Status: {meeting.status}</p>
                    {contextId && ( <button onClick={() => handleLeaveEvent(meeting, "MEETING")}>Leave Meeting</button>)}
                </li>
               ))}
            </ul>
            <button onClick={() => handleFindEvents("MEETING")}>Find Meetings</button>
            <button onClick={() => handleEventAdd("MEETING")}>Add Meeting</button>
            <ul className='meetup-list'>
            </ul>
        </section>

        <section className='tournaments'>
            <h2>My Tournaments</h2>
            <ul>
                {myTournaments.map((tournament) => (
                  <li>
                      <h3>Title: {tournament.title}</h3>
                      <p>Event ID: {tournament.eventId}</p>
                      <p>Description: {tournament.content}</p>
                      <p>Status: {tournament.status}</p>
                      {contextId && (<button onClick={() => handleLeaveEvent(tournament, "TOURNAMENT")}>Leave Tournament</button>)}
                  </li>
                ))}
            </ul>
            <button onClick={() => handleFindEvents("TOURNAMENT")}>Find Tournaments</button>
            <button onClick={() => handleEventAdd("TOURNAMENT")}>Add Tournament</button>
            <ul className='tournament-list'>
            </ul>
        </section>
    </>
  )
}

export default EventInput