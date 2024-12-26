import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import SignInLogic from './Components/SignIn/SignInLogic'
import SignUpLogic from './Components/SignUp/SignUpLogic'
import GameLogic from './Components/Games/GameLogic'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/SignUp' element={<SignUpLogic/>}></Route>
          <Route path='/SignIn' element={<SignInLogic/>}></Route>
          <Route path='/games' element={<GameLogic/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
