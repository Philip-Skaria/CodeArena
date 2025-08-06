import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import WelcomePage from './pages/WelcomePage'
import ForgotPassword from './pages/ForgotPassword'
import NeedHelp from './pages/NeedHelp'

export const App = () => {
  return (
  <>
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/welcomepage' element={<WelcomePage/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/needhelp' element={<NeedHelp/>}/>
      </Routes>
    </Router>
  </>
  
  )
}

export default App