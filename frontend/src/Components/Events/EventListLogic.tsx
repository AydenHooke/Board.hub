import React from 'react'
import EventListInput from './EventListInput';

function EventListLogic() {
    const queryParams = new URLSearchParams(location.search);
    const eventType = queryParams.get('type');

  return (
    <>
        <div>{eventType === "MEETING" && <EventListInput eventType={eventType}/>}</div>
        <div>{eventType === "TOURNAMENT" && <EventListInput eventType={eventType}/>}</div>
    </>
  )
}

export default EventListLogic