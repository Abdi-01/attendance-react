import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
// import Dashboard from './pages/Dashboard';
import { keepLogin } from './redux/actions'
import { getStudentSessionAction } from './redux/actions';
import DashboardAttend from './pages/DashboardAttend';
import StudentManagement from './pages/StudentsManagement';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css'
import ManageSession from './pages/ManageSession';
import { Route, Routes } from 'react-router';
import Sidebar from './components/Sidebar';
import ErrorPage from './pages/ErrorPage';
import AttendancePage from './pages/AttendancePage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.keepLogin();
  }

  render() {
    return (
      <div className={this.props.data.fullname && "d-flex"}>
        {
          this.props.data.fullname &&
          <Sidebar />
        }
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/dashboard' element={<DashboardAttend />} />
          {
            this.props.data.role == "admin" ?
              <>
                <Route path="/session" element={<ManageSession />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/dashboard' element={<DashboardAttend />} />
                <Route path='/student-management' element={<StudentManagement />} />
              </>
              :
              <Route path='*' element={<ErrorPage />} />
          }
          {
            this.props.data.role == "student" ?
            <>
              <Route path="/attendance" element={<AttendancePage />} />
            </>
            :
            <Route path='*' element={<ErrorPage />} />
          }
          <Route path='*' element={<ErrorPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    );
  }
}

const maptoprops = (state) => {
  return {
    data: state.userReducer,
  }
}

export default connect(maptoprops, { keepLogin, getStudentSessionAction })(App);
