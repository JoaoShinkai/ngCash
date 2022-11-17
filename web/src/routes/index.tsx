import { Route, Routes } from 'react-router-dom'
import StoreAuth from '../middlewares/UserAuth'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/dashboard' element={ <StoreAuth> <Dashboard /> </StoreAuth> }></Route>
            <Route path='/signup' element={  <SignUp />  }></Route>
            <Route path='/' element={  <Login />  }></Route>
        </Routes>
    )
}