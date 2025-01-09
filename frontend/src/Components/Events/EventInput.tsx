import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();

  return (
    <>
        <section className='meetups'>
            <div className='event-header'>
              <h2>My Meetups</h2>
              <div className='event-buttons'>
                <button onClick={() => handleFindEvents("MEETING")}>Find Meetings</button>
                
                <button onClick={() => handleEventAdd("MEETING")}>Add Meeting</button>
              </div>
            </div>
            <ul className='event-list'>
               {myMeetings.map((meeting) => (
                <li key={meeting.eventId} className='event-tile'>
                    <h3 className='event-title'>Title: {meeting.title}</h3>
                    <div className="event-line"></div>
                    <div className="event-content">
                      <img className="event-img" src="data:image/png;base64,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" alt="Chess Image" />
                      <p>By: 
                        <Link to={`/account/${meeting.accountId}`}>{meeting.username}</Link>
                      </p>
                      <p>Status: {meeting.status}</p>
                      {contextId && (<button onClick={() => handleLeaveEvent(meeting, "MEETING")}>{meeting.accountId === Number(contextId) ?  "Delete Meeting" : "Leave Meeting"}</button>)}
                    </div>
                </li>
               ))}
            </ul>
            
            <ul className='meetup-list'>
            </ul>
        </section>

        <section className='tournaments'>
            <div className='event-header'>
               <h2>My Tournaments</h2>
               <div className='event-buttons'>
                <button onClick={() => handleFindEvents("TOURNAMENT")}>Find Tournaments</button>
                <button onClick={() => handleEventAdd("TOURNAMENT")}>Add Tournament</button>
               </div>
            </div>
            
            <ul className='event-list'>
                {myTournaments.map((tournament) => (
                  <li onClick={()=>navigate(`/event/${tournament.eventId}`)}  key={tournament.eventId} className='event-tile'>
                      <h3>Title: {tournament.title}</h3>
                      <div className="event-line"></div>
                      <div className="event-content">
                        <img className="event-img" src="data:image/png;base64,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" alt="Chess Image" />
                        <p>By: 
                          <Link to={`/account/${tournament.accountId}`}>{tournament.username}</Link>
                        </p>
                        <p>Status: {tournament.status}</p>
                        {contextId && (<button onClick={() => handleLeaveEvent(tournament, "TOURNAMENT")}>Leave Tournament</button>)}
                      </div>
                  </li>
                ))}
            </ul>
            
            <ul className='tournament-list'>
            </ul>
        </section>
    </>
  )
}

export default EventInput