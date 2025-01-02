
interface EventInputProps {
  handleEventAdd: (eventName: string) => void
  handleFindEvents: (eventName: string) => void
}

function EventInput({handleFindEvents, handleEventAdd}: EventInputProps) {
  return (
    <>
        <section className='meetups'>
            <h2>Meetups</h2>
            <button onClick={() => handleFindEvents("MEETING")}>Find Meetings</button>
            <button onClick={() => handleEventAdd("MEETING")}>Add Meeting</button>
            <ul className='meetup-list'>
            </ul>
        </section>

        <section className='tournaments'>
            <h2>Tournaments</h2>
            <button onClick={() => handleFindEvents("TOURNAMENT")}>Find Meetings</button>
            <button onClick={() => handleEventAdd("TOURNAMENT")}>Add Tournament</button>
            <ul className='tournament-list'>
            </ul>
        </section>
    </>
  )
}

export default EventInput