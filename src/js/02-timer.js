import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysEl = timer.children[0].children[0];
const hoursEl = timer.children[1].children[0];
const minutesEl = timer.children[2].children[0];
const secondsEl = timer.children[3].children[0];

btnStart.setAttribute('disabled', true);
const date = new Date();
let obj;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let ms = date - selectedDates[0];

    if (ms > 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (ms < 0) {
      btnStart.disabled = false;
    }

    function convertMs(ms) {
      const second = -1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds };
    }

    obj = convertMs(ms);

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    btnStart.addEventListener('click', startTimer);

    function startTimer() {
      Notiflix.Notify.info('The timer is running!');
      let { days, hours, minutes, seconds } = obj;

      secondsEl.textContent = addLeadingZero(seconds);
      minutesEl.textContent = addLeadingZero(minutes);
      hoursEl.textContent = addLeadingZero(hours);
      daysEl.textContent = addLeadingZero(days);

      let intervalId = setInterval(() => {
        if (seconds > 0) {
          seconds -= 1;
          secondsEl.textContent = addLeadingZero(seconds);
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
          secondsEl.textContent = addLeadingZero(seconds);
          minutesEl.textContent = addLeadingZero(minutes);
        } else if (hours > 0) {
          hours -= 1;
          seconds = 59;
          minutes = 59;
          secondsEl.textContent = addLeadingZero(seconds);
          minutesEl.textContent = addLeadingZero(minutes);
          hoursEl.textContent = addLeadingZero(hours);
        } else if (days > 0) {
          days -= 1;
          seconds = 59;
          minutes = 59;
          hours = 23;
          secondsEl.textContent = addLeadingZero(seconds);
          minutesEl.textContent = addLeadingZero(minutes);
          hoursEl.textContent = addLeadingZero(hours);
          daysEl.textContent = addLeadingZero(days);
        } else {
          clearInterval(intervalId);
          Notiflix.Notify.success('The countdown is complete!');
        }
      }, 1000);
    }
  },
};

flatpickr(inputEl, options);
