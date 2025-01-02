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

function App() {
  return (
    <>
      <AccountProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/SignUp' element={<SignUpLogic/>}></Route>
            <Route path='/SignIn' element={<SignInLogic/>}></Route>
            <Route path='/Forums/*' element={<Forums/>}></Route>
            <Route path='/games' element={<GameLogic/>}></Route>
            <Route path='/events/*' element={<EventLogic/>}></Route>
            <Route path='/profile' element={<ProfileLogic/>}></Route>
          </Routes>
        </BrowserRouter>
      </AccountProvider>
    </>
  )
}

export default App
