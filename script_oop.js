class Timer extends HTMLElement {
    constructor() {
        super()

        this.playButton = document.getElementById("start-btn");
        this.pauseButton = document.getElementById("pause-btn");
        this.resetButton = document.getElementById("stop-btn");
        this.lapButton = document.getElementById("lap-btn");

        this.playButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
        this.resetButton.addEventListener("click", this.reset);
        this.lapButton.addEventListener("click", this.lap);

        this.startTime;
        this.elapsedTime = 0;
        this.timerInterval;
        this.counter = 1;
        this.prevLap;

        window.addEventListener("beforeunload", (ev) => this.save(ev))
        this.load()
    }

    load() {
        this.now = new Date();
        savedTime = localStorage.getItem("time");
        leaveTime = JSON.parse(window.localStorage.getItem("time"))
        diffTime = now.getTime() - leaveTime;
        console.log(leaveTime);
        console.log(now.getTime());
    }

    save() {
        date = new Date();
        localStorage.setItem("time", JSON.stringify({ leave_time: Date.now() }));
    }

    showButton(buttonKey) {
        playButton.style.display = buttonKey === "PLAY" ? "inline-block" : "none";
        pauseButton.style.display = buttonKey === "PLAY" ? "none" : "inline-block";
        lapButton.disabled = buttonKey === "PLAY" ? true : false;
    }

    lap() {
        currTime = startTime - elapsedTime;
        lapTime = prevLap - currTime;
        lap = counter + " " + document.getElementById("timer").innerHTML + " (+" + timeToString(lapTime) + ")<br>";
        printLap(lap);
        prevLap = currTime;
        counter += 1;
    }

    reset() {
        currTime = startTime - elapsedTime;
        lapTime = prevLap - currTime;
        str = document.getElementById("timer").innerHTML
        const timeArr = str.split(":");
        lap = "<br> Final time: " + printResult(timeArr[0], timeArr[1], timeArr[2]) + "<br>";
        printLap(lap);
        clearInterval(timerInterval);
        print("00:00:00:00");
        elapsedTime = 0;
        localStorage.setItem("time", 0);
        showButton("PLAY");
    }

    pause() {
        clearInterval(timerInterval);
        showButton("PLAY");
    }

    start() {
        const startTime = Date.now() - this.elapsedTime;
        if (this.counter === 1) {
            this.printHeaderLap();
            this.prevLap = startTime;
        }
        this.timerInterval = setInterval(function printTime() {
            this.elapsedTime = Date.now() - startTime;
            this.print(timeToString(elapsedTime));
            localStorage.setItem("time", elapsedTime);
        }, 10);
        this.showButton("PAUSE");
    }

    printResult(hour, minutes, seconds) {  
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

    print(txt) {
        document.getElementById("timer").innerHTML = txt;
    }
    
    printHeaderLap() {
        // counter = 1;
        header = "Time <br>";
        document.getElementById("record").innerHTML = header;
    }
    
    printLap(txt) {
        document.getElementById("record").innerHTML += txt;
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
}

window.customElements.define('timer-gok', Timer)