import { createContext, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../lib/api';

interface UserProps {
    id: number;
    username: string;
}

export interface AuthContextDataProps {
    user: UserProps,
    isUserLoading: boolean,
    balance: string;
    isLoadingBalance: boolean;
    loadBalance: () => Promise<void>;
    signIn: (username: string, password: string) => Promise<boolean>,
    logout: () => Promise<JSX.Element>
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(true);

    const [balance, setBalance] = useState('');
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);


    async function loadBalance(){
        setIsLoadingBalance(true);
        try{
            const data = await api.get(`/user/${user.id}`);

            setBalance(data.data.account.balance);
        }catch(err){
            console.log(err);
        } finally {
            setIsLoadingBalance(false);
        }
    }

    useEffect(() => {

        async function authUser(){
            setIsUserLoading(true);
    
            const localToken = localStorage.getItem('token');
    
            if(localToken){
                try{
                    api.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
    
                    const userResponse = await api.get('/user/authenticate');
    
                    setUser(userResponse.data);

                    setIsUserLoading(false);
                }catch(err){
                    console.log(err);
                    setIsUserLoading(false);
                }
            }
            else{
                setIsUserLoading(false);
            }
        }
        
        authUser();

    }, [])

    async function signIn(username: string, password: string){
        try{
            const result = await api.post('/user/login', { username, password })

            localStorage.setItem('token', result.data.token);

            api.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
    
            const userResponse = await api.get('/user/authenticate');

            setUser(userResponse.data);

            setIsUserLoading(false);
            
            return true;

        }catch(err){
            return false;
        }
    }

    async function logout(){
        localStorage.removeItem('token');
        setUser({} as UserProps);
        setIsUserLoading(false);

        return <Navigate to="/" />
    }

    return (
        <AuthContext.Provider
            value={{
                isUserLoading,
                user,
                balance,
                isLoadingBalance,
                loadBalance,
                signIn,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}