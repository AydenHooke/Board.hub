// import { useEffect } from 'react';
import { useEffect, useState } from 'react';
import EventInput from './EventInput'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAccount } from '../../Context/useAccount';
import { Event } from '../../Types/Event';
import { authorizationHander } from '../Home/Logout';

function EventLogic() {
  const navigate = useNavigate();
  const {id : contextId} = useAccount();
  const [myMeetings, setMyMeetings] = useState([]);
  const [myTournaments, setMyTournaments] = useState([]);

  useEffect(() => {

    //Navigate to read-only if user didn't log in
    if(!contextId){
      navigate('/list?type=MEETING');
    };

    async function fetchData() {
      try {
        const response1 = await axios.get(`http://18.224.45.201:8080/event/account/${contextId}`, {
            params: {
                type: "MEETING"
            }
        });
        const data1 = response1.data;
        setMyMeetings(data1);
        console.log(data1);

        const response2 = await axios.get(`http://18.224.45.201:8080/event/account/${contextId}`, {
            params: {
              type: "TOURNAMENT"
           }
        });
        const data2 = response2.data;
        setMyTournaments(data2);
        console.log(data2);
      } catch (error) {
        console.error(error);
        authorizationHander(error);
      }
    }

    fetchData();
  }, [contextId]);

  const handleFindEvents = (eventName: string) => {
    console.log(`Finding ${eventName}`);
    navigate(`/list?type=${eventName}`);
  }

  const handleEventAdd = (eventName: string) => {
    console.log(`Adding ${eventName}`);
    navigate(`/submit?type=${eventName}`);
  };

  const handleLeaveEvent = async (event: Event, type: string) => {
      try {
        await axios.delete(`http://18.224.45.201:8080/event/account/${contextId}/event/${event.eventId}`);
        console.log("Event deleted");
        if(type === "MEETING"){
          setMyMeetings(myMeetings.filter((meeting: Event) => meeting.eventId !== event.eventId));
        }
        else if(type === "TOURNAMENT"){
          setMyTournaments(myTournaments.filter((tournament: Event) => tournament.eventId !== event.eventId));
        }
      } catch (error) {
        console.error(error);
        authorizationHander(error);
      }
  }

  return (
    <>
        <EventInput  handleEventAdd={handleEventAdd} handleFindEvents={handleFindEvents} handleLeaveEvent={handleLeaveEvent} myMeetings={myMeetings} myTournaments={myTournaments}/>
    </>
  )
}

export default EventLogic