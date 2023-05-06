const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const dayLabel = document.getElementById("dayL");
const monthLabel = document.getElementById("monthL");
const yearLabel = document.getElementById("yearL");

const form = document.querySelector("form");


form.addEventListener("submit", handleSubmit);

const currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((input) => {
    const parent = input.parentElement;
    const value = input.value.trim();

    if (value === "") {
      input.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required";
      parent.querySelector("label").style.color = "red";
      validator = false;
    } else {
      input.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
    }

    if (input === monthInp) {
      const monthValue = parseInt(value);
      if (monthValue > 12 || monthValue < 1) {
        monthLabel.style.color = "hsl(0, 100%, 67%)";
        input.style.borderColor = "red";
        parent.querySelector("small").innerText = "Must be a valid month";
        validator = false;
      } else {
        monthLabel.style.color = "black";
      }
    }

    if (input === dayInp) {
      const dayValue = parseInt(value);
      if (dayValue > 31 || dayValue < 1) {
        dayLabel.style.color = "hsl(0, 100%, 67%)";
        input.style.borderColor = "red";
        parent.querySelector("small").innerText = "Must be a valid day";
        validator = false;
      } else {
        dayLabel.style.color = "black";
      }
    }

    if (input === yearInp) {
      const yearValue = parseInt(value);
      if (yearValue > currentYear ) {
        yearLabel.style.color = "hsl(0, 100%, 67%)";
        input.style.borderColor = "red";
        parent.querySelector("small").innerText = "Must be a valid year";
        validator = false;
      } else {
        yearLabel.style.color = "black";
      }
    }
  });

  return validator;
}

function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    let selectedDay = parseInt(dayInp.value);
    let selectedMonth = parseInt(monthInp.value);
    let selectedYear = parseInt(yearInp.value);

    if (selectedDay > currentDay) {
      currentDay = currentDay + months[selectedMonth - 1];
      currentMonth = currentMonth - 1;
    }

    if (selectedMonth > currentMonth) {
      currentMonth = currentMonth + 12;
      currentYear = currentYear - 1;
    }

    const diffDay = currentDay - selectedDay;
    const diffMonth = currentMonth - selectedMonth;
    const diffYear = currentYear - selectedYear;

    dayOtp.innerHTML = diffDay;
    monthOtp.innerHTML = diffMonth;
    yearOtp.innerHTML = diffYear;
  }
}