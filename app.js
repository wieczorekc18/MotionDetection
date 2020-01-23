


const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.69 // confidence threshold for predictions.
};

// this gets camera feed
// accounts for several possible browsers

navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia

const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const message = document.querySelector(".message")
const hand = document.querySelector(".hand")
const c = document.querySelector(".c");
const d = document.querySelector(".d");
const e = document.querySelector(".e");
const cMp3 = document.querySelector(".cMp3");
const dMp3 = document.querySelector(".dMp3");
const eMp3 = document.querySelector(".eMp3");
const x = document.querySelector(".x");
const y = document.querySelector(".y");

let model

handTrack.startVideo(video)
    .then(status => {
        if(status){
            navigator.getUserMedia({video: {}}, stream => {
                video.srcObject = stream;
                setInterval(runDetection, 10);
            },
            err => console.log(err)
            )
        }
    })

function unselect(el){
    if(el.classList.contains("blue")){
        el.classList.remove("blue")
    }
}

function runDetection(){
    model.detect(video)
        .then(predictions => {
            model.renderPredictions(predictions, canvas, context, video)
            if(predictions.length > 0){
                
                
                let xVal = predictions[0].bbox[0]
                let yVal = predictions[0].bbox[1]
                let widthVal = predictions[0].bbox[2]
                let heightVal = predictions[0].bbox[3]

                let xDiff = xVal*2
                let yDiff = yVal*2

                hand.style.top = yDiff + "px";
                hand.style.left = xDiff + "px";

                // x.innerHTML = ""
                // y.innerHTML = "";

                // x.append(xDiff)
                // y.append(yDiff)

                if(xDiff > 5 && xDiff < 110 && yDiff > 200 && yDiff < 400){
                    c.classList.add("blue")
                    cMp3.play()
                    unselect(d)
                    unselect(e)
                }else if(xDiff > 400 && xDiff < 520 && yDiff > 200 && yDiff < 400){
                    d.classList.add("blue");
                    dMp3.play();
                    unselect(c);
                    unselect(e);
                }else if(xDiff > 820 && xDiff < 940 && yDiff > 200 && yDiff < 400){
                    e.classList.add("blue");
                    eMp3.play();
                    unselect(c);
                    unselect(d);
                }else{
                    unselect(c);
                    unselect(d);
                    unselect(e);
                }
            }
        })
}

handTrack.load(modelParams)
    .then(loadedModel => {
        model = loadedModel
    })

