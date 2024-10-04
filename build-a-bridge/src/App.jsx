import {Button} from '@chakra-ui/react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<HomePage/ >}/>
        <Route path='/auth' element= {<AuthPage/ >}/>
        <Route path='/profile' element= {<ProfilePage/ >}/>
      </Routes>
    </>
  )
}

export default App;