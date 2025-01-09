import { FormEvent } from "react";

interface SubmitEventInputProps {
    eventType: string;
    name: string; setName: (name: string) => void;
    content: string; setContent: (content: string) => void;
    handleSubmit: (e: FormEvent) => void
    time: string; setTime: (time: string) => void;
    showErrorMessage: boolean;
  }
  
  function SubmitEventInput({ eventType, name, setName, content, setContent, time, setTime, handleSubmit, showErrorMessage }: SubmitEventInputProps) {
    const formatLocalDateTime = (date: Date) => {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60 * 1000);
      return localDate.toISOString().slice(0, 16);
    };

    return (
      <div>
        
        <form id="submit-event-form"  onSubmit={handleSubmit}>
            <fieldset>
              <h1 id='submit-event-heading'>Submit {eventType}</h1>
                {/* <legend>Event Details</legend> */}
                <label className='submit-event-field' htmlFor="name">Event Name:
                  <input required type="text" id="name" placeholder="Enter Event Name" value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                  <br />
                </label>

                <label className='submit-event-field' htmlFor="content">Event Details:
                  <textarea required id="content" placeholder="Enter Event Details" value={content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
                  <br />
                </label>

                <label className='submit-event-field' htmlFor="time">Meeting Time:
                <input required type="datetime-local" id="time" value={time} min={formatLocalDateTime(new Date())}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)} />
                <br />
                </label>

                <button type="submit" data-testid="submit-button" className="default-button" id="submit-event-button">Submit Event</button>

                {showErrorMessage && <p className="error-message" data-testid="error-message">Event Not Added</p>}
            </fieldset>
        </form>
      </div>
    );
  }
  
  export default SubmitEventInput;