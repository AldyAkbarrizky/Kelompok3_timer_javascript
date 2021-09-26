// Convert time to a format of hours, minutes, seconds, and milliseconds
// jadi record itu yang waktunya itu nambah terus
// ada print lap, itu nampilin display. dan di display itu nampilin record

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;
let counter = 1;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function printHeaderLap() {
    counter = 1;
    header = "Lap Time <br>";
    document.getElementById("record").innerHTML = header;
}

function printLap(txt) {
    document.getElementById("record").innerHTML += txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    printHeaderLap();
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
        localStorage.setItem("time", elapsedTime);
        console.log(elapsedTime)
    }, 10);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    printLap(counter + " " + document.getElementById("display").innerHTML);
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    localStorage.setItem("time", 0);
    showButton("PLAY");
}

function lap() {
    lap = counter + " " + document.getElementById("display").innerHTML + "<br>";
    printLap(lap);
    counter += 1;
}

// Create function save timer when close browser
window.onbeforeunload = load();

function load() {
    elapsedTime = localStorage.getItem("time");
    print(timeToString(elapsedTime));
}

// window.onbeforeunload = function() {
//     alert("Goodbye");
// };

// Create function to display buttons

function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}
// Create event listeners

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");
let lapButton = document.getElementById("lapButton");

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);