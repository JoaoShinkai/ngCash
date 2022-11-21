import { useEffect } from 'react';
import { useAuth } from '../hook/useAuth';
import Box from './Box';

import { Button } from '@mui/material';

export default function Header(){


    const { user, logout, balance, isLoadingBalance, loadBalance } = useAuth();

    useEffect(() => {
        loadBalance();
    }, [])

    return (
        <div className='bg-zinc-800 text-white py-4 px-8'>
            <div className='flex justify-between py-3'> 
                <div className='text-xl'>Bem vindo { user.username }</div>
                <Button variant='contained' onClick={logout}><i className="fa-solid fa-right-from-bracket pr-2"></i>Sair</Button>
            </div>
            <div className='flex gap-2 py-2'>
                <Box title='Saldo Atual' value={balance} isLoadingData={isLoadingBalance} />
            </div>
        </div>
    )
}