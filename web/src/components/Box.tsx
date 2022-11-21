import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    title: string;
    value: string;
    isLoadingData: boolean;
}

export default function Box({title, value, isLoadingData}: Props){
    return (
        <div className='bg-zinc-700 py-2 px-4 rounded min-w-[200px] divide-y divide-zinc-600'>
            <div className='py-1'> <i className="fa-solid fa-sack-dollar pr-2"></i> {title} </div>
            <div className='p-2 text-2xl font-bold flex justify-start'> { isLoadingData ? <CircularProgress size={20} color='inherit' /> : 'R$ ' + value }</div>
        </div>
    )
}