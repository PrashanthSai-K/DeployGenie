import './App.css';
import {Routes, Route} from 'react-router-dom'
import UserDashboard from './components/user/UserDashboard';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UserAddContainer from './components/user/UserAddContainer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/user" element={<UserDashboard />}  />
        <Route path='/user/container/new' element={<UserAddContainer />} />

        <Route path="/admin" element={<AdminDashboard />}  />

      </Routes>
    </>
  );
}

export default App;
