import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

import CircularProgress from '@mui/material/CircularProgress';

export interface props {
    children: React.ReactNode; 
}

export default function UserAuth({ children }: props){



    const { user, isUserLoading} = useAuth();


    if(isUserLoading){
        return(
            <div className='min-h-screen bg-zinc-800 flex justify-center items-center'>
                <CircularProgress />
            </div>
        )
    }
    
    if(!user.username){
        return <Navigate to="/" />
    }


    return (
        <>
            {children}
        </>
    )
}