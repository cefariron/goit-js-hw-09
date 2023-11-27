const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;

btnStart.addEventListener('click', handleStart);
btnStop.addEventListener("click", handleStop)

let intervalId;
btnStop.setAttribute('disabled', true);

function handleStart() {
  body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.disabled = false;
}

function handleStop() {
    btnStart.disabled = false;
    clearInterval(intervalId);
    btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
