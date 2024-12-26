import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import SignInLogic from './Components/SignIn/SignInLogic'
import SignUpLogic from './Components/SignUp/SignUpLogic'
import Forums from './Components/Forums/Forums';
import GameLogic from './Components/Games/GameLogic'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/SignUp' element={<SignUpLogic/>}></Route>
          <Route path='/SignIn' element={<SignInLogic/>}></Route>
          <Route path='/Forums' element={<Forums/>}></Route>
          <Route path='/games' element={<GameLogic/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
