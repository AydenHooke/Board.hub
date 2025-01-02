import EventInput from './EventInput'
import {useNavigate } from 'react-router-dom'

function EventLogic() {

  const navigate = useNavigate();

  const handleFindEvents = (eventName: string) => {
    console.log(`Finding ${eventName}`);
    navigate(`/list?type=${eventName}`);
  }

  const handleEventAdd = (eventName: string) => {
    console.log(`Adding ${eventName}`);
    navigate(`/submit?type=${eventName}`);
  };

  return (
    <>
        <EventInput  handleEventAdd={handleEventAdd} handleFindEvents={handleFindEvents}/>
    </>
  )
}

export default EventLogic