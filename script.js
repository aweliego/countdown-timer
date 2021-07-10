'use strict';

const main = document.getElementById('main');
const form = document.querySelector('form');
const labels = document.querySelectorAll('label');
const eventName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputTime = document.getElementById('time');
const startBtn = document.querySelector('.btn');

eventName.focus();

// Default date input to value of today
let todayString = new Date().toISOString().substring(0, 10);
inputDate.value = todayString;

// Default time input to 00:00
inputTime.value = '00:00';

form.addEventListener('submit', () => {
  // const year = eventDate.getFullYear();
  // const month = eventDate.getMonth();
  // const date = eventDate.getDate();
  // const hours = eventDate.getHours();
  // const minutes = eventDate.getMinutes();
  //   console.log(year);
  //   console.log(month);
  //   console.log(date);
  //console.log(hours);
  //   console.log(minutes);

  // check if date is in the past
  const eventDate = inputDate.valueAsDate;
  if (eventDate < new Date()) {
    alert('Please select a time in the future.');
    return false;
  }

  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
});

function getRemainingTime() {
  inputDate.valueAsDate = new Date(inputDate.value);
  console.log(inputDate.value); // logs the date from user input on format yyyy-MM-dd
  // Saving input date from user as event date
  const eventDate = inputDate.valueAsDate;
  console.log(eventDate);

  const eventTime = eventDate.getTime();
  // console.log(eventTime);
  const today = new Date().getTime();
  // console.log(today);
  const timeLeft = eventTime - today;
  // console.log(timeLeft);

  if (eventDate < new Date()) {
    // alert('Please select a time in the future.');
    // return false;
  } else {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // calculate how many days/hrs/mins/secs we have in the difference between future and today
    let days = Math.floor(timeLeft / oneDay);
    // console.log(days);
    let hours = Math.floor((timeLeft % oneDay) / oneHour);
    // console.log(hours);
    let minutes = Math.floor((timeLeft % oneHour) / oneMinute);
    // console.log(minutes);
    let seconds = Math.floor((timeLeft % oneMinute) / 1000);
    console.log(seconds);

    // Set values dynamically
    //Create a new HTML element with values above

    main.innerHTML = '';
    const deadlineIntro = document.createElement('div');
    deadlineIntro.classList.add('deadline-intro');
    deadlineIntro.innerHTML = `<h2>${pickALine(openingLines)}</h2>
    <p>${eventName.value} starts in:</p>`;
    main.appendChild(deadlineIntro);

    // Deadline element
    const deadline = document.createElement('div');
    deadline.classList.add('deadline');
    deadline.innerHTML = `    <div class="deadline-format">
      <div>
        <h4 class="days">${days < 10 ? `0${days}` : days}</h4>
        <span>days</span>
      </div>
    </div>
  
    <div class="deadline-format">
      <div>
        <h4 class="hours">${hours < 10 ? `0${hours}` : hours}</h4>
        <span>hours</span>
      </div>
    </div>
  
    <div class="deadline-format">
      <div>
        <h4 class="mins">${minutes < 10 ? `0${minutes}` : minutes}</h4>
        <span>mins</span>
      </div>
    </div>
  
    <div class="deadline-format">
      <div>
        <h4 class="secs">${seconds < 10 ? `0${seconds}` : seconds}</h4>
        <span>secs</span>
      </div>
    </div>`;

    main.appendChild(deadline);

    const otherActions = document.createElement('div');
    otherActions.innerHTML = `<p>Sit back and relax, or select one of the following options:</p>
    <div class="options">
    <input class="btn option" type="submit" value="Edit event" />
    <input class="btn option" type="submit" value="Delete event" />
    <input class="btn option" type="submit" value="Create new event" />
    </div>
    `;
    main.appendChild(otherActions);
  }

  if (timeLeft < 0) {
    clearInterval(countdown);
  }
}

// if inputDate.value is prior to today, show message/warning
// if timeLeft < 0, clearInterval + alert that event is reached

const openingLines = [
  'Exciting!',
  'Fabulous!',
  'Sensational!',
  'Awesome!',
  'Who needs an agenda?',
  'Ready for it?',
];

const pickALine = (array) => array[Math.floor(Math.random() * array.length)];
