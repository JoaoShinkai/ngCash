import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export interface props {
    children: React.ReactNode; 
}

export default function UserAuth({ children }: props){



    const { user, isUserLoading} = useAuth();


    if(isUserLoading){
        return(
            <div>Loading</div>
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