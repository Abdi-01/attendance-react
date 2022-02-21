import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageSession from './pages/ManageSession';
import { Route, Routes } from 'react-router';
import SidebarComp from './components/Sidebar';
function App() {
  return (
    <div className="d-flex">
      <SidebarComp/>
      <Routes>
        <Route path="/session" element={<ManageSession/>}/>
      </Routes>
    </div>
  );
}

export default App;
