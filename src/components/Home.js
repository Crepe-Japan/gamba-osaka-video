import { Box, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {

    return (
        <Box className='App'>
            < VStack >
                <Box py='4'>
                    <Image src="assets\images\title_slogan.png" alt="renewal-title" width="100%" height="auto" />
                    <Image src="assets\images\title_text.png" alt="title" width="100%" />
                </Box>
                <Box px='6'>
                    <VStack p='4' id="card"  >
                        <Box>
                            <Link to="/video-capture">
                                <Image className='captureBtn' src="assets\images\photo_button.png" alt="renewal-title" />
                            </Link>
                        </Box>
                        <Box>
                            <img src="assets\images\modelview_text.png" alt="model-view-text" width="80%"
                                style={{ margin: "auto", display: "block" }} />
                        </Box>
                    </VStack>
                </Box>
                <Box p="6">
                    <a href="https://www.gamba-osaka.net/club/character/" target="_blank" rel="noreferrer">
                        <Box style={{ textAlign: "center" }} >
                            <Image src="assets\images\mascot_img.png" alt="Renewal" width="100%" />
                        </Box>
                    </a>
                </Box>
            </VStack >
        </Box >
    )
}

export default Home