import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import EventListLogic from '../Components/Events/EventListLogic';
import { AccountProvider } from '../Context/AccountContext';
import '@testing-library/jest-dom';
import { Event } from '../Types/Event';

jest.mock('axios');

describe('EventListLogic', () => {
  beforeEach(() => {
    const mockEvents: Event[] = [
      { eventId: 1, accountId: 1, title: 'Event 1', username: "tester1", type: "MEETING", gameId: 1, dateCreated: new Date(), content: 'Content 1', dateMeet: new Date(), status: 'SCHEDULED' },
      { eventId: 2, accountId: 2, title: 'Event 2', username: "tester1", type: "MEETING", gameId: 1, dateCreated: new Date(), content: 'Content 2', dateMeet: new Date(), status: 'SCHEDULED' },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockEvents });
  });

  // test('fetches and displays events based on eventType and contextId', async () => {
  //   const { getByText } = render(
  //     <MemoryRouter initialEntries={['/events?type=MEETING']}>
  //       <AccountProvider>
  //         <EventListLogic />
  //       </AccountProvider>
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(getByText('Event 1')).toBeInTheDocument();
  //     expect(getByText('Event 2')).toBeInTheDocument();
  //   });

  //   expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/event/unadded/', {
  //     params: { type: 'MEETING' },
  //   });
  // });
});