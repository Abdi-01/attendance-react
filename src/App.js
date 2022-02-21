import logo from './logo.svg';
import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-calendar/dist/Calendar.css'
import SidebarComponent from './components/Sidebar';
import DashboardAttend from './pages/DashboardAttend';
import {Routes, Route} from 'react-router'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStudentSessionAction } from './redux/actions';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    // get data session student yang sedang login
    // dispatch(getStudentSessionAction()) 
  },[])

  return (
    <div className='row g-0'>
      <div className='col-md-3'>
        <SidebarComponent />
      </div>
      <div className='col-md-9'>
        <Routes>
          <Route path='/attendance' element={<DashboardAttend/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
