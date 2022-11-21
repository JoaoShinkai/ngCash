import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import { useAuth } from '../../hook/useAuth';
import customToast from '../../toast/customToast';

import './login.css';
const Logo = require('../../assets/logo.png');

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);

    const { signIn } = useAuth();

    const navigate = useNavigate();

    async function login(){
        setIsLoadingData(true);

        const res = await signIn(username, password);

        if(res){
            navigate("/dashboard")
        }
        else{
            customToast.error("Erro ao realizar login");
        }

        setIsLoadingData(false);
    }

    return(
        <div className='ngCash-login bg-zinc-900 flex p-8'>
            <div className='w-full flex justify-center items-center my-auto'>
                <div className='w-full flex justify-center items-center'>
                    <img src={Logo} alt="" />
                </div>
                <div className='w-full flex justify-center items-center p-2'>
                    <div className='flex-1 px-6'>
                        <div className='py-2 flex'>
                            <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} className='border-none p-4 bg-zinc-800 rounded-md border-gray-600 flex-1 outline-none' />
                        </div>
                        <div className='py-2 flex'>
                            <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} className='border-none p-4 bg-zinc-800 rounded-md border-gray-600 flex-1 outline-none' />
                        </div>
                        <div>
                            <Button title='Entrar' loading={isLoadingData} onClick={login} ></Button>
                        </div>
                        <div>Não possui uma conta? <Link to="/signUp">Cadastre-se</Link></div> 
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}