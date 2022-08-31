import { Box, Image, VStack } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <Box className='App'>
      < VStack >
        <Box py='4'>
          <Image src="assets\images\renewal_title.png" alt="renewal-title" width="100%" height="auto" />
          <Image src="assets\images\title_text.png" alt="title" width="100%" />
        </Box>
        <Box px='6'>
          <VStack p='4' id="card"  >
            <Box>
              <Image onClick={() => alert("Hello")} className='captureBtn' src="assets\images\photo_button.png" alt="renewal-title" />
            </Box>
            <Box>
              <img src="assets\images\modelview_text.png" alt="model-view-text" width="80%"
                style={{ margin: "auto", display: "block" }} />
            </Box>
          </VStack>
        </Box>
        <Box p="6">
          <a href="/" target="_blank" rel="noreferrer">
            <div style={{ textAlign: "center" }} >
              <img src="assets\images\renewal-img.jpg" alt="Renewal" width="100%" />
            </div>
          </a>
        </Box>
      </VStack >
    </Box >

  );
}

export default App;
