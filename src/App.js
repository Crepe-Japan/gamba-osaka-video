import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import VideoCapture from './components/VideoCapture'
import Home from './components/Home';
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route path='/video-capture' element={< VideoCapture />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
