class Timer extends HTMLElement {
    constructor() {
        super()

        this.playButton = document.getElementById("start-btn");
        this.pauseButton = document.getElementById("pause-btn");
        this.resetButton = document.getElementById("stop-btn");
        this.lapButton = document.getElementById("lap-btn");
        this.timerText = document.getElementById("timer");
        this.recordText = document.getElementById("record");

        this.playButton.onclick = () => this.start();
        this.pauseButton.onclick = () => this.pause();
        this.resetButton.onclick = () => this.reset();
        this.lapButton.onclick = () => this.lap();

        this.startTime;
        this.elapsedTime = 0;
        this.timerInterval;
        this.counter = 1;
        this.prevLap;
        this.state = "paused";
    }

    timeToString(time) {
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

    printResult(hour, minutes, seconds) {  
        let txt = "";
        if (hour != "00") {
            var hourTime = parseInt(hour);
            if (hourTime >= 24) {
                var day = parseInt(hourTime / 24);
                hourTime = hourTime - (day * 24);
                txt = day + " hari " + hourTime + " jam " + minutes + " menit " + seconds + " detik ";            
            }
            else {
                txt = hour + " jam " + minutes + " menit " + seconds + " detik ";
            }        
        }
        else if (minutes != "00")  {
            txt = minutes + " menit " + seconds + " detik ";
        }
        else if (seconds != "00")  {
            txt = seconds + " detik ";
        } else {
            txt = "0 detik"
        }
        return txt
    }

    start() {
        this.startTime = Date.now() - this.elapsedTime
        if(this.counter === 1) {
            this.recordText.innerHTML = "Time <br/>"
        }
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.timerText.innerHTML = this.timeToString(this.elapsedTime);
        }, 10);

        this.state = "started";
        this.pauseButton.style.display = "inline-block";
        this.playButton.style.display = "none";
        this.lapButton.disabled = false;
    }

    pause() {
        clearInterval(this.timerInterval);

        this.state = "paused";
        this.pauseButton.style.display = "none";
        this.playButton.style.display = "inline-block";
        this.lapButton.disabled = true;
    }

    reset() {
        const str = this.timerText.innerHTML;
        const timeArr = str.split(":");
        const final_time = "Final time: " + this.printResult(timeArr[0], timeArr[1], timeArr[2]) + "<br>";
        this.recordText.innerHTML += final_time
        clearInterval(this.timerInterval);
        this.timerText.innerHTML = "00:00:00:00";
        this.elapsedTime = 0;

        this.state = "paused";
        this.pauseButton.style.display = "none";
        this.playButton.style.display = "inline-block";
        this.lapButton.disabled = true;
    }

    lap() {
        const currTime = this.startTime - this.elapsedTime;
        let lapTime = "";
        if(this.counter == 1) {
            lapTime = this.elapsedTime;
        } else {
            lapTime = this.prevLap - currTime;
        }
        const lap_time = this.counter + " " + this.timerText.innerHTML + " (+" + this.timeToString(lapTime) + ")<br>";
        this.recordText.innerHTML += lap_time;
        this.prevLap = currTime;
        this.counter += 1;
    }
}

window.customElements.define("the-timer", Timer)