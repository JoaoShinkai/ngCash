import { Route, Routes } from 'react-router-dom'
import UserAuth from '../middlewares/UserAuth'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import SignUp from '../pages/SignUp'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/dashboard' element={ <UserAuth> <Dashboard /> </UserAuth> }></Route>
            <Route path='/signup' element={  <SignUp />  }></Route>
            <Route path='/' element={  <Login /> }></Route>
            <Route path='*' element={  <NotFound /> }></Route>
        </Routes>
    )
}