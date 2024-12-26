import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import SignInLogic from './Components/SignIn/SignInLogic'
import SignUpLogic from './Components/SignUp/SignUpLogic'
import Forums from './Components/Forums/Forums';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
