
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';

export default function Dashboard(){

    

    return(
        <div className='flex flex-col bg-zinc-900 min-h-screen'>
            <Header />
            <div className='flex-1 text-white p-3'>
                <Tabs />
            </div>
        </div>
    )
}