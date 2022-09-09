import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import VideoCapture from './components/VideoCapture'
import Home from './components/Home';
function App() {
  const videoJsOptions = {
    controls: false,
    bigPlayButton: false,
    width: 2,
    height: 2,
    fluid: false,
    plugins: {
      record: {
        audio: true,
        /*   video: true, */
        video: {
          // video media constraints: set resolution of camera
          width: { min: 1280, ideal: 640, max: 1920 },
          height: { min: 920, ideal: 480, max: 1080 }
        },
        // dimensions of captured video frames
        frameWidth: 1920,
        frameHeight: 1080,
        maxLength: 10,
        debug: true,
        /*     // enable ffmpeg.wasm plugin
            convertEngine: 'ffmpeg.wasm',
            convertWorkerURL: '../../node_modules/@ffmpeg/core/dist/ffmpeg-core.js',
            // convert recorded data to MP4 (and copy over audio data without encoding)
            convertOptions: ['-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-c:a', 'copy', '-f', 'mp4'],
            // specify output mime-type
            pluginLibraryOptions: {
              outputType: 'video/mp4'
            } */
      }
    }
  };
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route path='/video-capture' element={< VideoCapture {...videoJsOptions} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
