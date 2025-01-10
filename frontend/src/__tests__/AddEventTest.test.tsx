import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import SubmitEventLogic from '../Components/Events/SubmitEventLogic';
import { AccountProvider } from '../Context/AccountContext';
import '@testing-library/jest-dom';

jest.mock('axios');

describe('SubmitEventLogic', () => {
  test('submits event and navigates to /events', async () => {
    const mockResponse = {
      data: { eventId: '1', name: 'Event 1' },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse).mockResolvedValueOnce(mockResponse);

    const {getByLabelText, getByTestId } = render(
      <MemoryRouter initialEntries={['/submit-event?type=MEETING']}>
        <AccountProvider>
          <SubmitEventLogic />
        </AccountProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/event name/i), { target: { value: 'Event 1' } });
    fireEvent.change(getByLabelText(/event details:/i), { target: { value: 'Event content' } });
    fireEvent.change(getByLabelText(/meeting time/i), { target: { value: '2030-10-10T10:00' } });

    fireEvent.click(getByTestId("submit-button"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenCalledWith('http://18.224.45.201:8080/event/', {
        title: 'Event 1',
        content: 'Event content',
        type: 'MEETING',
        dateMeet: '2030-10-10T10:00',
        accountId: '',
      }, {
        headers: {
          Authorization: '',
        },
      });
      expect(axios.post).toHaveBeenCalledWith('http://18.224.45.201:8080/event/account/', mockResponse.data, {
        headers: {
          Authorization: '',
        },
      });
    });
  });

//   test('shows error message on submission failure', async () => {
//     (axios.post as jest.Mock).mockRejectedValue(new Error('Submission failed'));

//     const {getByLabelText, getByTestId } = render(
//       <MemoryRouter initialEntries={['/submit-event?type=MEETING']}>
//         <AccountProvider>
//           <SubmitEventLogic />
//         </AccountProvider>
//       </MemoryRouter>
//     );

//     fireEvent.change(getByLabelText(/event name/i), { target: { value: 'Event 1' } });
//     fireEvent.change(getByLabelText(/event details/i), { target: { value: 'Event content' } });
//     // Omitting changing the time will cause an error message to appear
//     // fireEvent.change(getByLabelText(/meeting time/i), { target: { value: '2023-10-10T10:00' } });

//     fireEvent.click(getByTestId("submit-button"));

//     await waitFor(() => {
//       expect(getByTestId("error-message")).toBeInTheDocument();
//     });
//   });
});