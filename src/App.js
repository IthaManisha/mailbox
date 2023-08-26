import AuthForm from './components/Auth/AuthForm';
import Home from './components/Home/Home';
import { useSelector} from 'react-redux';
import './App.css'

function App() {
  const token=useSelector(state=>state.auth.token)
  const islogin=!!token;
  console.log(islogin)
  return (
    <>
      {!islogin && 
        <div className="expense-container">
          <AuthForm/>
        </div>
      }
  
      {islogin && <Home/>}
    </>
  );
}

export default App;
