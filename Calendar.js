//Implement the calendar's functionality, such as navigation, booking, and saving - rubric
//Consider using localStorage or a server-side database to persist booked data - rubric

// Initialize current date to today's date
let currentDate = new Date();

//Define every month in an array for display over grid
const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Storage method to keep booked dates and reason for booking
let booked = JSON.parse(localStorage.getItem("booked")) || {};

//When the document is loaded, render the calendar and set up button listeners
document.addEventListener("DOMContentLoaded", function() {
  renderCalendar();

  //Set up click listeners for last and next month navigation buttons
  document.getElementById("lastMonth").addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById("nextMonth").addEventListener("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
});

//Function to render the calendar for the current month and year
function renderCalendar() {
  const chosenMonthAndYear = document.getElementById("chosenMonthAndYear");
  const body = document.getElementById("body");

  //Update the header with the current month and year
  chosenMonthAndYear.textContent = monthsList[currentDate.getMonth()] + " " + currentDate.getFullYear();

  //Clear the current calendar body
  body.innerHTML = "";

  //Get the first day of the month and the total days in the month
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  //Build the calendar grid with dates
  let row = document.createElement("tr");

  //Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  //Populate the calendar with day numbers
  for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
    const cell = document.createElement("td");
    cell.textContent = dayNum;

    //Format the date string for storing bookings (YYYY-MM-DD)
    const fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${dayNum}`;

    //Check if the date is booked and style it accordingly
    if (booked[fullDate]) {
      cell.classList.add("booked");
      cell.title = `Booked: ${booked[fullDate]}`;
    }

    //Add a click event to book or display booking info for the selected date
    cell.addEventListener("click", function() {
      if (booked[fullDate]) {
        alert("You already booked: \"" + booked[fullDate] + "\" for this day!");
      } else {
        const reason = prompt("Please enter an event you would like to book for " + fullDate);
        if (reason) {
          booked[fullDate] = reason;
          localStorage.setItem("booked", JSON.stringify(booked));
          renderCalendar();
        }
      }
    });

    row.appendChild(cell);

    //After filling 7 cells (a week), append the row and start a new one
    if ((firstDay + dayNum) % 7 === 0) {
      body.appendChild(row);
      row = document.createElement("tr");
    }
  }

  //Append the last row if there are remaining cells (empty days)
  body.appendChild(row);
}


  //Function to jump to a specific month and year entered by the user
  function jumpToDate(event) {

  //Prevent form submission from refreshing the page
  event.preventDefault(); 

  //Get the input values for month and year
  const monthInput = document.getElementById("monthInput").value;
  const yearInput = document.getElementById("yearInput").value;
  
  //Convert inputs to integers
  const month = parseInt(monthInput) - 1;
  const year = parseInt(yearInput);

  // Check if month and year inputs are valid
  if (!isNaN(month) && month >= 0 && month <= 11 && !isNaN(year)) {
    
    //Update currentDate with the new month and year
    currentDate.setFullYear(year);
    currentDate.setMonth(month);
    currentDate.setDate(1); // Set day to 1 to avoid issues with month transitions

    //Log updated currentDate
    console.log("Navigating to date:", currentDate);

    //Re-render the calendar to show the specified date
    renderCalendar();
  } else {

    alert("Please enter a valid month (1-12) and year.");

  }
}
