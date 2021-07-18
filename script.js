// https://docs.google.com/document/d/1BUmMqbh8vqBVCcyywfG4Ov1E9eVR5AJFJLfUJDWydho/edit

'use strict';

// ****** SELECT ITEMS **********

const main = document.getElementById('main');
const form = document.querySelector('form');
const labels = document.querySelectorAll('label');
const eventName = document.getElementById('name');
const inputDate = document.getElementById('date');
const inputTime = document.getElementById('time');
const startBtn = document.querySelector('.btn');
const eventList = document.getElementById('event-list');

// ****** EVENT LISTENERS **********

// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkDate();
  //loadEvent();
  addToLocalStorage();
  let countdown = setInterval(getRemainingTime, 1000);
  getRemainingTime();
});

window.addEventListener('DOMContentLoaded', setBackToDefault);

// ****** FUNCTIONS **********

function setBackToDefault() {
  eventName.focus();
  let todayString = new Date().toISOString().substring(0, 10);
  inputDate.value = todayString;
  inputTime.value = '00:00';
}

// Check if input date is in the past
function checkDate() {
  const eventDay = inputDate.valueAsDate;
  if (eventDay < new Date()) {
    alert('Please select a time in the future.');
    return false;
  }
}

// COUNTDOWN
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
}

const createEvent = ({ name, date, time }) => ({
  name,
  date,
  time,
});

function loadEvent() {
  const event = document.createElement('div');
  event.innerHTML = `<p class="title">${eventName.value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;
  eventList.append(event);
}

function addToLocalStorage() {
  const eventDay = inputDate.valueAsDate;
  const newEvent = createEvent({
    name: eventName.value,
    date: eventDay,
    time: inputTime.value,
  });
  console.log(newEvent);
  window.localStorage.setItem('event', JSON.stringify(newEvent));
}

// The function to create the event should create a HTML element (including edit and delete buttons) within a container
// Then in getRemainingTime, create a new element with the dealdine and append it to that container
