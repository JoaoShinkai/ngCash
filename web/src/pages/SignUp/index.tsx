import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import customToast from '../../toast/customToast';


import { api } from '../../lib/api';

const Logo = require('../../assets/logo.png');

export default function SignUp(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoadingData, setIsLoadingData] = useState(false);

    async function submit(){

        setIsLoadingData(true)


        if(username.length < 3){
            customToast.error("O campo de usuário deve conter ao menos 3 caracteres");
            setIsLoadingData(false);
            return;
        }
        if(password.length < 8){
            customToast.error("A senha deve conter ao menos 8 caracteres");
            setIsLoadingData(false);
            return;
        }
        if(password !== confirmPassword){
            customToast.error("As senhas devem ser iguais");
            setIsLoadingData(false);
            return;
        }


        try{
            await api.post('/user', { username, password });

            customToast.success("Usuário cadastrado com sucesso");
            setIsLoadingData(false);
        }catch(err){
            console.log(err);
            setIsLoadingData(false);
        }
        
        setIsLoadingData(false);

    }

    return (
        <div className='bg-zinc-900 text-white min-h-screen flex p-8'>
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
                        <div className='py-2 flex'>
                            <input type="password" placeholder='Confirmar Senha' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='border-none p-4 bg-zinc-800 rounded-md border-gray-600 flex-1 outline-none' />
                        </div>
                        <div>
                            <Button title='Cadastrar' loading={isLoadingData} onClick={submit}/>
                        </div>
                        <div>Já possui uma conta? <Link to="/">Entre</Link></div> 
                    </div>
                    
                </div>
            </div>
        </div>
    )
}