// unhide editMenu
function editMenuToggleOn() {
  editMenu.classList.remove("toggle-off");
  editMenu.classList.add("toggle-on");
  editMenu.style = " display: flex";
}

// hide editMenu
function editMenuToggleOff() {
  editMenu.classList.remove("toggle-on");
  editMenu.classList.add("toggle-off");
}

// renders

// render date and time in header
function renderCurrentDayTime() {
  // Create new Date object
  const currentDate = new Date();

  // Get the current date and time
  const day = currentDate.toLocaleString("en-US", {
    weekday: "long"
  });
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  // convert to 12-hour format
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;

  // Return day and time object
  return {
    day,
    time
  };
}


// render screens
function renderScreens() {

  // get the container section
  let container = document.getElementById("container");

  // loop through the days in timeTable
  for (const day in timeTableData) {
    if (timeTableData.hasOwnProperty(day)) {

      // render respective screen
      container.innerHTML += `<div id="${day}" class="screen"></div>`;
    }
  }
}

// render screen (day) cards
function renderCards() {

  // loop through the days in timeTable
  for (const day in timeTableData) {
    if (timeTableData.hasOwnProperty(day)) {

      // get screen div with respect to day
      let screen = document.getElementById(day);

      // for off days
      if (day === "sunday") {
        screen.innerHTML += timeTableData[day];
      }

      // regular days
      else {
        // loop through subjects
        for (const subject in timeTableData[day]) {
          if (timeTableData[day].hasOwnProperty(subject)) {

            // get the subject's object wrt day 
            const subjectObject = timeTableData[day][subject];

            // title or the subject
            const title = subjectObject.title;

            // lecture starting time
            const startTime = subjectObject.time.start;

            // lecture ending time
            const endTime = subjectObject.time.end;

            // render break data in screen
            if (subject.startsWith("break")) {
              screen.innerHTML += `
              <div class="break-container">
                ${title}
              </div>
              `
            }

            // render subject data in screen
            else {
              screen.innerHTML += `
              <div class="card-container">
                <div class="card-foreground">
                <div class=" subject-card-title-wrapper">
                  <h1 id="subject-card-title">${title}</h1>
                </div>
                <div class="subject-card-time-wrapper">
                  <span id="subject-card-time">${startTime} - ${endTime}</span>
                </div>
                </div>
                <div class="card-background" style="--card-clr: pink;"></div>
              </div>
              `
            }
          }

        }
      }

    }
  }
}