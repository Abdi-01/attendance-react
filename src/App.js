import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudentManagement from './pages/StudentsManagement';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className='d-flex'>
        <Sidebar />
        <Routes>
          <Route path='/student-management' element={<StudentManagement />} />
        </Routes>
      </div>
    );
  }
}

export default App;
