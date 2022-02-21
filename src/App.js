import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import AttendancePage from './pages/AttendancePage';

function App() {
  return (
    <div className="App d-flex">
      <Sidebar />
      <AttendancePage />
    </div>
  );
}

export default App;
