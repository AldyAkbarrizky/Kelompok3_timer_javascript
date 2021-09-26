// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;
let counter = 1;
let prevLap;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("timer").innerHTML = txt;
}

function printHeaderLap() {
    // counter = 1;
    header = "Lap Time <br>";
    document.getElementById("record").innerHTML = header;
}

function printLap(txt) {
    document.getElementById("record").innerHTML += txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    startTime = Date.now() - elapsedTime;
    if (counter === 1) {
        printHeaderLap();
        prevLap = startTime;
    }
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    currTime = startTime - elapsedTime;
    lapTime = prevLap - currTime;
    lap = counter + " " + timeToString(lapTime) + " " + document.getElementById("timer").innerHTML + "<br>";
    printLap(lap);
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
}

function lap() {
    currTime = startTime - elapsedTime;
    lapTime = prevLap - currTime;
    lap = counter + " " + timeToString(lapTime) + " " + document.getElementById("timer").innerHTML + "<br>";
    printLap(lap);
    prevLap = currTime;
    counter += 1;
}

// Create function to display buttons

function showButton(buttonKey) {
    playButton.style.display = buttonKey === "PLAY" ? "inline-block" : "none";
    pauseButton.style.display = buttonKey === "PLAY" ? "none" : "inline-block";
    lapButton.style.display = buttonKey === "PLAY" ? "none" : "inline-block";
}
// Create event listeners

let playButton = document.getElementById("start-btn");
let pauseButton = document.getElementById("pause-btn");
let resetButton = document.getElementById("stop-btn");
let lapButton = document.getElementById("lap-btn");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);