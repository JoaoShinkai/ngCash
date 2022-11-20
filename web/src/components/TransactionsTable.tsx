import { format } from 'date-fns';

import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { api } from '../lib/api';

interface TransactionsProps {
    id: number;
    value: number;
    debitedAccount: {
        user: {
            id: number;
            username: string;
        }
    };
    creditedAccount: {
        user: {
            id: number;
            username: string;
        }
    };
    createdAt: string;
}

export default function TransactionsTable(){

    const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionsProps[]>([]);
    const [transactionType, setTransactionType] = useState<"all" | "sent" | "received">('all');
    const [filterDate, setFilterDate] = useState<string | null>(null);

    const { user } = useAuth();

    async function loadTransactions(){
        try{
            const res = await api.get('/transaction');

            setTransactions(res.data);
            setFilteredTransactions(res.data);
            filterTransactions();
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        loadTransactions();
    }, [])

    function alterTransactionType(e: React.ChangeEvent<HTMLSelectElement>){
        if(e.target.value === "all" || e.target.value === "sent" || e.target.value === "received"){
            setTransactionType(e.target.value);
        } 
    }

    function alterDate(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.value !== ""){
            setFilterDate(e.target.value);
        }
        else{
            setFilterDate(null);
        }
    }

    async function filterTransactions(){
        const res = await api.get('/transaction');
        
        let items: TransactionsProps[] = res.data;

        if(transactionType === "sent"){
            items = items.filter(transaction => transaction.debitedAccount.user.id === user.id);
        }
        else if(transactionType === "received"){
            items = items.filter(transaction => transaction.creditedAccount.user.id === user.id);
        }

        if(filterDate !== null){
            const filterDateTZ = new Date(filterDate);
            filterDateTZ.setDate(filterDateTZ.getDate() + 1)
            
            items = items.filter(transaction => format(new Date(transaction.createdAt), 'dd/MM/yyyy') === format(filterDateTZ, 'dd/MM/yyyy'));
        }

        setFilteredTransactions(items);
    }

    return(
        <div>
            <div className='py-3 pb-6 flex gap-2 justify-end'>
                <input type="date" className='bg-zinc-700 p-3 rounded' onChange={alterDate} />
                <select className='bg-zinc-700 p-3 rounded' onChange={e => alterTransactionType(e)}>
                    <option value="all">Todos</option>
                    <option value="received">Recebidos</option>
                    <option value="sent">Enviados</option>
                </select>
                <Button variant='contained' onClick={() => filterTransactions()}> <i className="fa-solid fa-filter pr-2"></i> Filtrar</Button>
            </div>
            <TableContainer component={Paper} sx={{ borderRadius: 2, backgroundColor: '#27272a' }}>
                <Table sx={{ minWidth: 650, backgroundColor: '#27272a' }} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID da transação</TableCell>
                            <TableCell sx={{ color: 'white' }} align="center">Enviado por</TableCell>
                            <TableCell sx={{ color: 'white' }} align="center">Recebido por</TableCell>
                            <TableCell sx={{ color: 'white' }} align="center">Valor</TableCell>
                            <TableCell sx={{ color: 'white' }} align="right">Data e hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredTransactions.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'td, th': {color: 'white', borderColor: '#333333'} }}
                        >
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="center">{row.debitedAccount.user.username}</TableCell>
                            <TableCell align="center">{row.creditedAccount.user.username}</TableCell>
                            <TableCell align="center">{row.value}</TableCell>
                            <TableCell align="right">{ format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm') }</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}