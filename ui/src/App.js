import './App.css';
import {Routes, Route} from 'react-router-dom'
import UserDashboard from './components/user/UserDashboard';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UserAddContainer from './components/user/UserAddContainer';
import UserManageContainer from './components/user/UserManageContainer';
import Register from './components/login/Register';
import AdminUsersManage from './components/admin/AdminUsersManage';
import Demo from './components/Demo';
import AdminManageContainer from './components/admin/AdminManageContainer';
import Chart from './components/others/Chart';
import UserViewContainer from './components/user/UserViewContainer';
import AdminViewContainer from './components/admin/AdminViewContainer';
// import { VncScreen } from 'react-vnc';
import VNC from './components/others/VNC';
import UserViewImage from './components/user/UserViewImage';
import AdminViewImage from './components/admin/AdminViewImage';

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<Demo />} />
        <Route path='/deploy' element={<Demo />} />

        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path="/user" element={<UserDashboard />}  />
        <Route path='/user/container/new' element={<UserAddContainer />} />
        <Route path='/user/container/manage' element={<UserManageContainer />} />
        <Route path='/user/container/view/:name' element={<UserViewContainer />} />
        <Route path='/user/images' element={<UserViewImage />} />

        <Route path="/admin" element={<AdminDashboard />}  />
        <Route path="/admin/users" element={<AdminUsersManage />}  />
        <Route path='/admin/container/manage' element={<AdminManageContainer />} />
        <Route path='/admin/container/view/:name' element={<AdminViewContainer />} />
        <Route path='/admin/images' element={<AdminViewImage />} />

        <Route path='/ch' element={<VNC />} />

      </Routes>
    </>
  );
}

export default App;
