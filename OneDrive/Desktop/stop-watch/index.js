let startTime;
let updatedTime;
let difference;
let interval;
let isRunning = false;
let lapCount = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapsList = document.getElementById("laps-list");

document.getElementById("start").addEventListener("click", () => {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        isRunning = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
    difference = 0;
    lapCount = 0;
    updateTime();
    lapsList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
    if (isRunning) {
        lapCount++;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        lapsList.appendChild(lapItem);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesDisplay.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsDisplay.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsDisplay.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}
document.getElementById("reset").addEventListener("click", () => {
    clearInterval(interval); // Stop the stopwatch
    isRunning = false; // Set the running state to false
    difference = 0; // Reset the time difference to 0
    lapCount = 0; // Reset the lap count to 0
    lapsList.innerHTML = ""; // Clear the lap list
    
    // Reset the time display to 00:00:00
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";
    millisecondsDisplay.textContent = "00";
});

