import { FormEvent } from "react";

interface SubmitEventInputProps {
    eventType: string;
    name: string; setName: (name: string) => void;
    content: string; setContent: (content: string) => void;
    handleSubmit: (e: FormEvent) => void
    time: string; setTime: (time: string) => void;
  }
  
  function SubmitEventInput({ eventType, name, setName, content, setContent, time, setTime, handleSubmit }: SubmitEventInputProps) {
    return (
      <div>
        <h1>Submit {eventType}</h1>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Event Details</legend>
                <label htmlFor="name">Event Name:</label>
                <input required type="text" id="name" placeholder="Enter Event Name" value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                <br />
                <label htmlFor="content">Event Details:</label>
                <textarea required id="name" placeholder="Enter Event Details" value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
                <br />
                <label htmlFor="time">Meeting Time:</label>
                <input required type="datetime-local" id="time" value={time} min={new Date().toISOString().slice(0, 16)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} />
                <br />
                <button type="submit">Submit Event</button>
            </fieldset>
        </form>
      </div>
    );
  }
  
  export default SubmitEventInput;