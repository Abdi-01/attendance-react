import React from 'react';
import { connect } from 'react-redux';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import './app.scss'
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import {keepLogin} from './redux/actions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.keepLogin();
  }

  render() { 
    return (
      <div>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/test" element={<Dashboard/>} />
        </Routes>
      </div>
    );
  }
}

export default connect(null,{keepLogin}) (App);
