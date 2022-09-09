import React, { useEffect, useRef } from 'react';
import '../App.css';
import 'video.js/dist/video-js.css';
import 'webrtc-adapter';
import { startRecording } from '../utils/canvas-record'
import { canvasStreamer } from '../utils/canvas-stream'
import { Box, Button, Heading, HStack, VStack, Divider, Link } from '@chakra-ui/react'

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';


function VideoCapture() {
    const recordingTimeMS = 5000;
    const cameraViewRef = useRef(null);
    const playerVideoRef = useRef(null);
    const inputSelectorRef = useRef(null);
    const canvasRef = useRef(null)
    const recordPreviewRef = useRef(null)
    const downloadBtnRef = useRef(null)
    const recordBtnRef = useRef(null)
    const downloadLinkRef = useRef(null)
    const streamBtnRef = useRef(null)

    const constraints = {
        video: {
            width: { min: 1280, ideal: 640, max: 1920 },
            height: { min: 920, ideal: 480, max: 1080 }
        }
    };

    useEffect(() => {
        recordBtnRef.current.disabled = true
        downloadBtnRef.current.disabled = true
        downloadLinkRef.current.disabled = true

    });

    const getCameraSelection = async () => {
        let inputSelector = inputSelectorRef.current;

        /*  let inputSection = document.getElementsByClassName('inputSelector')[0]; */
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // handle selection changes
        inputSelector.addEventListener('change', changeVideoInput);
        console.log(videoDevices)
        // populate select options
        var deviceInfo, option, i;
        for (i = 0; i !== videoDevices.length; ++i) {
            deviceInfo = videoDevices[i];
            option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'videoinput') {
                console.info('Found video input device: ', deviceInfo.label);
                option.text = deviceInfo.label || 'input device ' +
                    (inputSelectorRef.current.length + 1);
                inputSelector.appendChild(option);
            }
        }

        if (inputSelector.length === 0) {
            // no output devices found, disable select
            option = document.createElement('option');
            option.text = 'No video input devices found';
            option.value = undefined;
            inputSelector.appendChild(option);
            inputSelector.disabled = true;
            console.warn(option.text);
        } else {
            console.info('Total video input devices found:', inputSelector.length);
        }

        // show input selector section
        /* inputSection.style.display = 'block'; */
    };


    /*     navigator.mediaDevices.ondevicechange = (event) => {
            console.log("Device Changed")
            getCameraSelection()
        }; */


    const canvasRecorder = (e) => {

        /*       const canvas = document.getElementById("c1");    
              const canvasStream = canvas.captureStream(25); */

        console.log("Recording")
        e.target.innerText = "Recording .... "
        e.target.disabled = true
        downloadBtnRef.current.disabled = true


        startRecording(cameraViewRef.current.captureStream(), recordingTimeMS).then((recordedChunks) => {
            let recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
            recordPreviewRef.current.src = URL.createObjectURL(recordedBlob);

            downloadLinkRef.current.href = recordPreviewRef.current.src;
            downloadLinkRef.current.download = "RecordedVideo.mp4";
            downloadLinkRef.current.disabled = false

            downloadBtnRef.current.disabled = false

            e.target.innerText = "Record"
            e.target.disabled = false
        })
            .catch((error) => {
                if (error.name === "NotFoundError") {
                    console.log("Camera or microphone not found. Can't record.");
                } else {
                    console.log(error)
                }
            })


    }

    const startStream = async () => {

        let updatedConstraints = {}
        streamBtnRef.current.hidden = true
        recordBtnRef.current.disabled = false

        // first Launch
        /*  if (inputSelectorRef.current.length === 0) { */
        console.log("First")
        updatedConstraints = {
            ...constraints,
        };

        /*    }
           else {
               updatedConstraints = {
                   ...constraints,
                   deviceId: {
                       exact: inputSelectorRef.current.value
                   }
               };
           } */
        handleStream(updatedConstraints)
    }

    const handleStream = (constraints) => {
        let cameraView = cameraViewRef.current


        navigator.mediaDevices.getUserMedia({
            video: constraints,
            audio: true
        }).then((stream) => {
            cameraView.srcObject = stream;
            cameraView.captureStream = cameraView.captureStream || cameraView.mozCaptureStream;
            return new Promise((resolve) => cameraView.onplaying = resolve);
        })
    }

    const onCameraStream = async () => {
        playerVideoRef.current.play()

        canvasStreamer.doLoad(cameraViewRef.current,
            playerVideoRef.current,
            canvasRef.current)

        await getCameraSelection()
    }

    const changeVideoInput = (event) => {
        try {
            startStream();
        } catch (error) {
            console.warn(error);
            // jump back to first output device in the list as it's the default
            event.target.selectedIndex = 0;
        }
    }

    return (
        <Box className='CaptureView' >
            <VStack spacing={3} w="full" alignItems="center">
                <Box id='cameraVideo' >
                    <Box style={{ zIndex: -1, position: 'relative', top: "-10px" }}>
                        <video
                            ref={playerVideoRef}
                            width="5"
                            height="5"
                            muted loop playsInline >
                            <source src="videos/sample_hevc.mov" type="video/quicktime" />
                            <source src="videos/kurosedayo_vp8_q0_10000_002.webm" type="video/webm" />
                        </video>
                    </Box>
                    <video width='0' height='0'
                        onPlay={() => onCameraStream()}
                        ref={cameraViewRef}
                        autoPlay muted>
                    </video>
                </Box>
            </VStack>
            <VStack spacing={3} w="full" alignItems="center">
                <Box >
                    <VStack>
                        <Button ref={streamBtnRef}
                            onClick={() => startStream()}>
                            Let's Start
                        </Button>
                        <canvas ref={canvasRef} width='5' height='5'></canvas>
                        <Box className="inputSelector">
                            <Heading as='h3' size='sm'>Select video input: </Heading>
                            <select id='selector' ref={inputSelectorRef} ></select>
                        </Box>
                        <HStack>
                            <Button ref={recordBtnRef} color='red'
                                onClick={(e) => canvasRecorder(e)}>
                                Record
                            </Button>
                            <Button ref={downloadBtnRef}>
                                <Link ref={downloadLinkRef} className="button">
                                    Download
                                </Link>
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </VStack>
            <Divider p='4' />
            <VStack p='4' spacing={3} w="full" alignItems="center">
                <Heading>Preview</Heading>
                <Box>
                    <video ref={recordPreviewRef} controls></video>
                </Box>
            </VStack>
        </Box >

    );

}

export default VideoCapture