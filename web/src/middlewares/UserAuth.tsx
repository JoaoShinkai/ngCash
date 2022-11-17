import { Navigate } from 'react-router-dom';

export interface props {
    children: React.ReactNode; 
}

export default function UserAuth({ children }: props){

    const logged = true;
    const loadingProvider = false;


    if(loadingProvider){
        return(
            <div>Loading</div>
        )
    }
    
    if(!logged){
        return <Navigate to="/" />
    }


    return (
        <>
            {children}
        </>
    )
}