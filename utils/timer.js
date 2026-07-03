let timeDisplay = document.querySelector('#timeDisplay');
timeDisplay.style.display = 'block';

let timeText = document.querySelector('#timeText');

export default function showTime(t){
    timeText.innerText = t.toFixed(2);
}