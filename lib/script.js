'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = document.getElementById('main');
var form = document.querySelector('form');
var labels = document.querySelectorAll('label');
var eventName = document.getElementById('name');
var inputDate = document.getElementById('date');
var inputTime = document.getElementById('time');
var startBtn = document.querySelector('.btn');

eventName.focus();

// Default date input to value of today
var todayString = new Date().toISOString().substring(0, 10);
inputDate.value = todayString;

// Default time input to 00:00
inputTime.value = '00:00';

form.addEventListener('submit', function () {
  // check if date is in the past
  var eventDay = inputDate.valueAsDate;
  if (eventDay < new Date()) {
    alert('Please select a time in the future.');
    return false;
  }

  // Save event to local storage
  var event = new Event(eventName.value, eventDay, inputTime.value);
  //console.log(event);
  window.localStorage.setItem('event', JSON.stringify(event));

  // different way of creating event
  console.log(createEvent({
    name: eventName.value,
    date: eventDay,
    time: inputTime.value
  }));

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

  var countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
});

function getRemainingTime() {
  //console.log(inputDate.value); // logs the date from user input in format yyyy-MM-dd (STRING)
  //console.log(inputTime.value); // logs time in format 00:00 (STRING)

  // NEW CODE Saving input date from user as event date

  // let eventDay = inputDate.valueAsDate; // correct date
  // //console.log('first eventDay' + eventDay);

  // const eventYear = eventDay.getFullYear();
  // const eventMonth = eventDay.getMonth();
  // const eventDate = eventDay.getDate();
  // const eventHours = parseInt(inputTime.value.split(':')[0]);
  // const eventMinutes = parseInt(inputTime.value.split(':')[1]);
  // // console.log(eventYear);
  // // console.log(eventMonth);
  // console.log(eventDate); // correct date
  // console.log(eventHours); // correct hour
  // // console.log(eventMinutes);

  // inputDate.valueAsDate = new Date(
  //   eventYear,
  //   eventMonth,
  //   eventDate,
  //   eventHours,
  //   eventMinutes,
  //   0
  // ); // incorrect date (one day earlier)
  // console.log('inputdate' + inputDate.valueAsDate);

  // PREVIOUS CODE Saving input date from user as event date
  inputDate.valueAsDate = new Date(inputDate.value);
  var eventDay = inputDate.valueAsDate;
  console.log(eventDay);

  var eventTime = eventDay.getTime();
  //console.log(eventTime);
  var today = new Date().getTime();
  // console.log(today);
  var timeLeft = eventTime - today;
  // console.log(timeLeft);

  var oneDay = 24 * 60 * 60 * 1000;
  var oneHour = 60 * 60 * 1000;
  var oneMinute = 60 * 1000;

  // calculate how many days/hrs/mins/secs we have in the difference between future and today
  var days = Math.floor(timeLeft / oneDay);
  // console.log(days);
  var hours = Math.floor(timeLeft % oneDay / oneHour);
  // console.log(hours);
  var minutes = Math.floor(timeLeft % oneHour / oneMinute);
  // console.log(minutes);
  var seconds = Math.floor(timeLeft % oneMinute / 1000);
  //console.log(seconds);

  // Set values dynamically
  //Create a new HTML element with values above

  main.innerHTML = '';
  var deadlineIntro = document.createElement('div');
  deadlineIntro.classList.add('deadline-intro');
  deadlineIntro.innerHTML = '<h2>' + pickALine(openingLines) + '</h2>\n    <p>' + eventName.value + ' starts in:</p>';
  main.appendChild(deadlineIntro);

  // Deadline element
  var deadline = document.createElement('div');
  deadline.classList.add('deadline');
  deadline.innerHTML = '    <div class="deadline-format">\n      <div>\n        <h4 class="days">' + (days < 10 ? '0' + days : days) + '</h4>\n        <span>days</span>\n      </div>\n    </div>\n  \n    <div class="deadline-format">\n      <div>\n        <h4 class="hours">' + (hours < 10 ? '0' + hours : hours) + '</h4>\n        <span>hours</span>\n      </div>\n    </div>\n  \n    <div class="deadline-format">\n      <div>\n        <h4 class="mins">' + (minutes < 10 ? '0' + minutes : minutes) + '</h4>\n        <span>mins</span>\n      </div>\n    </div>\n  \n    <div class="deadline-format">\n      <div>\n        <h4 class="secs">' + (seconds < 10 ? '0' + seconds : seconds) + '</h4>\n        <span>secs</span>\n      </div>\n    </div>';

  main.appendChild(deadline);

  var otherActions = document.createElement('div');
  otherActions.innerHTML = '<p>Sit back and relax, or select one of the following options:</p>\n    <div class="options">\n    <input class="btn option" type="submit" value="Edit event" />\n    <input class="btn option" type="submit" value="Delete event" />\n    <input class="btn option" type="submit" value="Create new event" />\n    </div>\n    ';
  main.appendChild(otherActions);
}

var Event = function Event(name, date, time) {
  _classCallCheck(this, Event);

  this.name = name;
  this.date = date;
  this.time = time;
};

var createEvent = function createEvent(_ref) {
  var name = _ref.name,
      date = _ref.date,
      time = _ref.time;
  return {
    name: name,
    date: date,
    time: time
  };
};

var openingLines = ['Exciting!', 'Fabulous!', 'Sensational!', 'Awesome!', 'Who needs an agenda?', 'Ready for it?'];

var pickALine = function pickALine(array) {
  return array[Math.floor(Math.random() * array.length)];
};