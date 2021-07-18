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
  // check if date is in the past
  const eventDay = inputDate.valueAsDate;
  if (eventDay < new Date()) {
    alert('Please select a time in the future.');
    return false;
  }

  // Save event to local storage
  let event = new Event(eventName.value, eventDay, inputTime.value);
  //console.log(event);
  window.localStorage.setItem('event', JSON.stringify(event));

  // different way of creating event
  console.log(
    createEvent({
      name: eventName.value,
      date: eventDay,
      time: inputTime.value,
    })
  );

  // const year = eventDate.getFullYear();
  // const month = eventDate.getMonth();
  // const date = eventDate.getDate();
  // const hours = eventDate.getHours();
  // const minutes = eventDate.getMinutes();
  // console.log(year);
  // console.log(month);
  // console.log(date);
  // console.log(hours); // always logs 2 no matter what time the event is
  // console.log(minutes); // always logs 0 no matter what time the event is

  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
});

function getRemainingTime() {
  //console.log(inputDate.value); // logs the date from user input in format yyyy-MM-dd (STRING)
  //console.log(inputTime.value); // logs time in format 00:00 (STRING)

  // NEW CODE Saving input date from user as event date

  let eventDay = inputDate.valueAsDate;
  console.log(eventDay);

  const eventYear = eventDay.getFullYear();
  const eventMonth = eventDay.getMonth();
  const eventDate = eventDay.getDate();
  const eventHours = parseInt(inputTime.value.split(':')[0]);
  const eventMinutes = parseInt(inputTime.value.split(':')[1]);
  console.log(eventYear);
  console.log(eventMonth);
  console.log(eventDate);
  console.log(eventHours);
  console.log(eventMinutes);

  inputDate.valueAsDate = new Date(
    eventYear,
    eventMonth,
    eventDate,
    eventHours,
    eventMinutes,
    0
  );
  console.log(inputDate.valueAsDate);

  // PREVIOUS CODE Saving input date from user as event date
  // inputDate.valueAsDate = new Date(inputDate.value);
  // const eventDay = inputDate.valueAsDate;
  // console.log(eventDay);

  const eventTime = eventDay.getTime();
  // console.log(eventTime);
  const today = new Date().getTime();
  // console.log(today);
  const timeLeft = eventTime - today;
  // console.log(timeLeft);

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
  //console.log(seconds);

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

class Event {
  constructor(name, date, time) {
    this.name = name;
    this.date = date;
    this.time = time;
  }
}

const createEvent = ({ name, date, time }) => ({
  name,
  date,
  time,
});

const openingLines = [
  'Exciting!',
  'Fabulous!',
  'Sensational!',
  'Awesome!',
  'Who needs an agenda?',
  'Ready for it?',
];

const pickALine = (array) => array[Math.floor(Math.random() * array.length)];
