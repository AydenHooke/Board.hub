import { useLocation } from 'react-router-dom';
import SubmitEventInput from './SubmitEventInput';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useAccount } from '../../Context/useAccount';

function SubmitEventLogic() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventType = queryParams.get('type');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const { id, jwt : contextJwt } = useAccount();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios.post(`http://localhost:8080/event/`, {
      title: name,
      content: content,
      type: eventType,
      dateMeet: time,
      accountId: id
    },{
      headers: {
        Authorization: `${contextJwt}`
      }
    }).then((response) => {
      console.log(response.data);
      // Call the second request after the first one is successful
      return axios.post(`http://localhost:8080/event/account/${id}`, response.data, {
        headers: {
          Authorization: `${contextJwt}`
        }
      });
    }).then((response) => {
      console.log(response.data);
      console.log("Event Added");
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {eventType === 'MEETING' && <SubmitEventInput 
      eventType="MEETING" 
      name={name} setName={setName}
      content={content} setContent={setContent}
      time={time} setTime={setTime}
      handleSubmit={handleSubmit}/>}

      {eventType === 'TOURNAMENT' && <SubmitEventInput 
      eventType="TOURNAMENT" 
      name={name} setName={setName}
      content={content} setContent={setContent}
      time={time} setTime={setTime}
      handleSubmit={handleSubmit}/>}
    </>
  );
}

export default SubmitEventLogic;