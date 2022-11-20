
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { api } from '../lib/api';
import customToast from '../toast/customToast';

import Button from './Button';
import TransactionsTable from './TransactionsTable';

export default function Tabs(){

    const [usernameToTransfer, setUsernameToTransfer] = useState('');
    const [valueToTransfer, setValueToTransfer] = useState(0);
    const [isSendingTransfer, setIsSendingTransfer] = useState(false);

    const [value, setValue] = useState('1');

    const { loadBalance } = useAuth();

    async function submitTransfer(){
        if(valueToTransfer <= 0){
            customToast.error("Valor inválido para transferência");
            return;
        }
        if(usernameToTransfer.length < 1){
            customToast.error("Informe a conta de destino");
            return;
        }

        try{
            setIsSendingTransfer(true)
            await api.post('/transaction', { creditUsername: usernameToTransfer, value: valueToTransfer });

            customToast.success("Transferência realizada com sucesso");

            setUsernameToTransfer('');
            setValueToTransfer(0);

            loadBalance();
        }catch(err: any){
            if(!!err.response.data.message){
                customToast.error(err.response.data.message)
            }
            customToast.error("Erro interno");
            console.log(err);
        } finally{
            
            setIsSendingTransfer(false)
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
      
      const AntTab = styled((props: any ) => <Tab disableRipple {...props} />)(
        ({ theme }) => ({
          minWidth: 0,
          [theme.breakpoints.up('sm')]: {
            minWidth: 0,
          },
          marginRight: theme.spacing(1),
          color: 'white',
          fontFamily: [
            'Roboto',
          ].join(','),
          '&:hover': {
            color: '#40a9ff',
            opacity: 1,
          },
          '&.Mui-selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
          },
        }),
      );




    return(
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <AntTab label="Nova Transferência" value="1" />
                        <AntTab label="Ver extrato" value="2" />
                        <AntTab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <form>
                        <div className='py-2 flex'>
                            <input type="text" placeholder='Username da conta de destino' value={usernameToTransfer} onChange={ e => setUsernameToTransfer(e.target.value)} className='border-none p-4 bg-zinc-800 rounded-md border-gray-600 flex-1 outline-none' />
                        </div>
                        <div className='py-2 flex'>
                            <input type="number" placeholder='Valor' value={valueToTransfer} onChange={ e => setValueToTransfer(Number(e.target.value))} className='border-none p-4 bg-zinc-800 rounded-md border-gray-600 flex-1 outline-none' />
                        </div>
                        <div>
                            <Button title='Confirmar' loading={isSendingTransfer} onClick={submitTransfer} ></Button>
                        </div>
                    </form>
                </TabPanel>
                <TabPanel value="2">
                    <TransactionsTable />
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    )
}