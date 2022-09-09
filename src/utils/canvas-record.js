export const startRecording = (audioStream, stream, lengthInMS) => {
    const audioTrack = audioStream.getAudioTracks()[0]
    /*  console.log(audioTrack) */
    stream.addTrack(audioTrack)

    const options = {
        /*  audioBitsPerSecond: 128000,
         videoBitsPerSecond: 2500000, */
        /*   mimeType: 'audio/mp4' */
    }
    let recorder = new MediaRecorder(stream, options);
    let data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    /*  log(`${recorder.state} for ${lengthInMS / 1000} seconds…`); */

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
        () => {
            if (recorder.state === "recording") {
                recorder.stop();
            }
        },
    );

    return Promise.all([
        stopped,
        recorded
    ])
        .then(() => data);
}

function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
}