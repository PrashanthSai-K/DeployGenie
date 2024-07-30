import './App.css';
import {Routes, Route} from 'react-router-dom'
import UserDashboard from './components/user/UserDashboard';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UserAddContainer from './components/user/UserAddContainer';
import UserManageContainer from './components/user/UserManageContainer';
import Register from './components/login/Register';
import AdminUsersManage from './components/admin/AdminUsersManage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="/user" element={<UserDashboard />}  />
        <Route path='/user/container/new' element={<UserAddContainer />} />
        <Route path='/user/container/manage' element={<UserManageContainer />} />


        <Route path="/admin" element={<AdminDashboard />}  />
        <Route path="/admin/users" element={<AdminUsersManage />}  />


      </Routes>
    </>
  );
}

export default App;
