import './App.css';
import Auth from './components/auth/Auth';

import Home from "./components/home/Home"
import Profile from './components/profile/Profile';

import { Routes , Route , Navigate} from "react-router-dom"; 

import { useSelector } from 'react-redux';
import Chat from './components/chat/Chat';

function App() {

  document.title = "Home";

  const user  = useSelector((state)=>state.authReducer.authData);
  console.log(user);


  return (
    <div className='app'>

      <Routes>

        <Route path='/' element={user? <Navigate to="/home" /> :<Navigate to="/auth"/>}   />

        <Route path="/home" element={user? <Home /> : <Navigate to="/auth" />} />

        <Route path="/auth" element={user? <Navigate to="/home" /> :<Auth />} />

        <Route path="/profile/:id" element={user? <Profile />: <Navigate to="/auth" />} />

        <Route path='/chat' element={user? <Chat/>: <Navigate to="/auth" />} />
      </Routes>



    </div>
  );
}

export default App;
