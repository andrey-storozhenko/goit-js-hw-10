import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

console.log("Timer");
let userSelectedDate = null;
const btn = document.querySelector('[data-start]');
const input = document.querySelector("#datetime-picker");

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];
        console.log(pickedDate);
     
        if (pickedDate.getTime() < new Date().getTime()) {
            iziToast.show({
                title: 'Hey',
                message: "Please choose a date in the future"
            });
            btn.disabled = true;
            return;
        }
        btn.disabled = false;
        userSelectedDate = pickedDate;
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return `${value}`.padStart(2, "0");
}

btn.addEventListener("click", () => {
    btn.disabled = true;
    input.disabled = true;
    const interval = setInterval(() => {
        const diff = userSelectedDate - new Date();
        const { days, hours, minutes, seconds } = convertMs(diff);

        if (diff <= 0) {
            clearInterval(interval);
            daysTimer.textContent  = "00";
            hoursTimer.textContent  = "00";
            minTimer.textContent  = "00";
            secondsTimer.textContent  = "00";
            input.disabled = false;
            return;
        }

        daysTimer.textContent  = days;
        hoursTimer.textContent  = addLeadingZero(hours);
        minTimer.textContent  = addLeadingZero(minutes);
        secondsTimer.textContent  = addLeadingZero(seconds);
    }, 1000);

});

