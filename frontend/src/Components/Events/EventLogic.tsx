import EventInput from './EventInput'
import {useNavigate } from 'react-router-dom'

function EventLogic() {

  const navigate = useNavigate();

  const handleMeetingAdd = () => {
    console.log('Add Meeting');
    navigate("/submit?type=MEETING");
  }

  const handleTournamentAdd = () => {
    console.log('Add Tournament');
    navigate('/submit?type=TOURNAMENT');
  };

  return (
    <>
        <EventInput handleMeetingAdd={handleMeetingAdd} handleTournamentAdd={handleTournamentAdd}/>
    </>
  )
}

export default EventLogic