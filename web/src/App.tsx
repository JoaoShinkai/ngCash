import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} theme="colored" />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
