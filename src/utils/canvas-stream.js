export const canvasStreamer = {

    doLoad: function (cameraVideo, playerVideo, canvas) {
        /*  this.cameraVideo = document.querySelector('.cameraView>video');
         this.playerVideo = document.getElementById('playerVideo') */

        this.cameraVideo = cameraVideo
        this.playerVideo = playerVideo

        this.canvas = canvas;
        this.canvasContent = this.canvas.getContext("2d");


        this.width = this.cameraVideo.videoWidth / 2;
        this.height = this.cameraVideo.videoHeight / 2;

        this.canvas.width = this.width
        this.canvas.height = this.height

        this.playerVideoCalcWidth = this.playerVideo.videoWidth * this.height / this.playerVideo.videoHeight

        this.playerVideoCalcHeight = this.playerVideo.videoHeight * this.width / this.playerVideo.videoWidth
        this.midCalcHeight = this.height / 2 - this.playerVideoCalcHeight / 2
        console.log(this.width, this.height)
        console.log(this.playerVideo.videoWidth, this.playerVideo.videoHeight)
        console.log(this.playerVideoCalcHeight)
        this.timerCallback();

    },

    timerCallback: function () {
        if (this.cameraVideo.paused || this.cameraVideo.ended) {
            return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 0);
    },

    computeFrame: function () {
        this.canvasContent.drawImage(this.cameraVideo, 0, 0, this.width, this.height);
        this.canvasContent.drawImage(this.playerVideo, 0, this.midCalcHeight, this.width, this.playerVideoCalcHeight)
        return;
    }
};