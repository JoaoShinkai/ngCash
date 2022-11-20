import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    title: string;
    value: string;
    isLoadingData: boolean;
}

export default function Box({title, value, isLoadingData}: Props){
    return (
        <div className='bg-zinc-700 py-2 px-4 rounded min-w-[150px] divide-y divide-zinc-600'>
            <div className='py-1'> <i className="fa-solid fa-sack-dollar"></i> {title} </div>
            <div className='py-2 text-2xl font-bold flex justify-center'> { isLoadingData ? <CircularProgress size={20} color='inherit' /> : 'R$ ' + value }</div>
        </div>
    )
}