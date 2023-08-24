import './App.css';
import AuthForm from './components/Auth/AuthForm';
import Home from './components/Home/Home';
import auth from './components/store/auth';
import { useSelector} from 'react-redux';

function App() {
  const token=useSelector(state=>state.auth.token)
  const islogin=!!token;
  console.log(islogin)
  return (
    <>
    {!islogin && <AuthForm/>}
    {islogin && <Home/>}
    </>
  );
}

export default App;
