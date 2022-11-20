import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './contexts/AuthContext';
import Routes from './routes';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} theme="colored" />
        <Routes />
      </BrowserRouter>
    </AuthContextProvider>
    
  );
}

export default App;
