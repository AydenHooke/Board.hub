
interface EventInputProps {
  handleMeetingAdd: () => void
  handleTournamentAdd: () => void
}

function EventInput({handleMeetingAdd, handleTournamentAdd}: EventInputProps) {
  return (
    <>
        <section className='meetups'>
            <h2>Meetups</h2>
            <button onClick={handleMeetingAdd}>Add Meeting</button>
            <ul className='meetup-list'>
            </ul>
        </section>

        <section className='tournaments'>
            <h2>Tournaments</h2>
            <button onClick={handleTournamentAdd}>Add Tournament</button>
            <ul className='tournament-list'>
            </ul>
        </section>
    </>
  )
}

export default EventInput