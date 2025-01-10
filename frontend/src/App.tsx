import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import SignInLogic from './Components/SignIn/SignInLogic'
import SignUpLogic from './Components/SignUp/SignUpLogic'
import Forums from './Components/Forums/Forums';
import GameLogic from './Components/Games/GameLogic'
import './App.css';
import ProfileLogic from './Components/Profile/ProfileLogic';
import EventLogic from './Components/Events/EventLogic';
import { AccountProvider } from './Context/AccountContext';
import SubmitEventLogic from './Components/Events/SubmitEventLogic';
import EventListLogic from './Components/Events/EventListLogic';
import PublicProfileLogic from './Components/Profile/PublicProfileLogic';
import EventPageLogic from './Components/Events/EventPageLogic';
import AddGameLogic from './Components/Games/AddGame/AddGameLogic';
import AllGames from './Components/Games/AllGames';
import Logout from './Components/Home/Logout';

function App() {
  return (
    <>
      <AccountProvider>
        <BrowserRouter>
          <NavBar />
          <div id="sub-root">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/SignUp' element={<SignUpLogic />}></Route>
              <Route path='/SignIn' element={<SignInLogic />}></Route>
              <Route path='/Forums/*' element={<Forums />}></Route>
              <Route path='/allGames' element={<AllGames />}></Route>
              <Route path='/games' element={<GameLogic />}></Route>
              <Route path='/events/*' element={<EventLogic />}></Route>
              <Route path='/profile' element={<ProfileLogic />}></Route>
              <Route path='/submit' element={<SubmitEventLogic />}></Route>
              <Route path='/list' element={<EventListLogic />}></Route>
              <Route path='/account/:userId' element={<PublicProfileLogic />}></Route>
              <Route path='/event/:eventId' element={<EventPageLogic />}></Route>
              <Route path='/addGame' element={<AddGameLogic />}></Route>
              <Route path='/logout' element={<Logout />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AccountProvider>
    </>
  )
}

export default App
