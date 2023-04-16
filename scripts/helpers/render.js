// renders

// render date and time in header
function renderCurrentDayTime() {
  // Create new Date object
  const currentDate = new Date();

  // Get the current date and time
  const day = currentDate.toLocaleString("en-US", {
    weekday: "long",
  }).toLowerCase();

  // get current hours and minutes
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  // convert to 12-hour format
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;

  // Return day and time object
  return {
    day,
    time,
  };
}

// render screens
function renderScreens() {
  // get the container section
  let container = document.getElementById("container");

  // render default screen if user don't have added the json
  if (timeTableData === null) {
    container.innerHTML += `<div id="default-screen">hello world</div>`;
  }

  // render screens according to the added json
  else {
    // reset container
    container.innerHTML = "";

    // loop through the days in timeTable
    for (const day in timeTableData) {
      if (timeTableData.hasOwnProperty(day)) {
        // render respective screen
        container.innerHTML += `<div id="${day}" class="screen"></div>`;
      }
    }
  }

}

// render screen (day) cards
function renderCards(offDays) {
  // loop through the days in timeTable
  for (const day in timeTableData) {
    if (timeTableData.hasOwnProperty(day)) {
      // get screen div with respect to day
      let screen = document.getElementById(day);

      // define an array of colors
      const cardColors = [
        "#979797",
        "#FF7D7D",
        " #9ACA4C",
        " #76CAF9",
        "#8179E0",
        "#E5B962",
        " #84FFB5",
        "#B69898",
      ];

      // reinitialize of array
      let copyCardColors = cardColors;

      // for off days
      if (offDays.includes(day)) {
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
                `;
            }

            // render subject data in screen
            else {
              // generate a random index to select a color from the array
              const randomIndex = Math.floor(
                Math.random() * copyCardColors.length
              );

              // select the random color from the array
              const randomColor = copyCardColors[randomIndex];

              // remove the color to avoid the repetitive colors
              copyCardColors.splice(randomIndex, 1);

              // get the height according to the titles
              const height = 5 * title.length;

              const {
                time
              } = renderCurrentDayTime();
              // render card
              screen.innerHTML += `
                <div class="card-container" style="min-height: ${height}rem;">
                  <div class="card-foreground">
                      <div class="subject-card-title-wrapper">
                        ${title
                          .map((e) => {
                            return `<h1 id="subject-card-title">${e}</h1>`;
                          })
                          .join("")}
                      </div>
                      <div class="subject-card-time-wrapper">
                        <span id="subject-card-time">${startTime.replace(
                          /\b(AM|PM)\b/gi,
                          ""
                        )} - ${endTime.replace(/\b(AM|PM)\b/gi, "")}</span>
                      </div>
                  </div>
                  <div class="card-background" style="--card-clr: ${randomColor};"></div>
                </div>`;
            }
          }
        }
      }
    }
  }
}

// check disabled cards for current day 
function checkDisableCards(day, offDays) {
  // for off days
  if (offDays.includes(day)) {
    return;
  }

  // regular days
  // get screen div with respect to day
  let screen = document.getElementById(day);

  // reset the innerHTML
  screen.innerHTML = "";

  // define an array of colors
  const cardColors = [
    "#979797",
    "#FF7D7D",
    " #9ACA4C",
    " #76CAF9",
    "#8179E0",
    "#E5B962",
    " #84FFB5",
    "#B69898",
  ];

  // reinitialize of array
  let copyCardColors = cardColors;

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

      // current time
      const {
        time
      } = renderCurrentDayTime();

      // render break data in screen
      if (subject.startsWith("break")) {
        screen.innerHTML += `
            <div class="break-container">
              ${title}
            </div>
            `;
      }

      // other weak days
      else {
        // generate a random index to select a color from the array
        const randomIndex = Math.floor(Math.random() * copyCardColors.length);

        // select the random color from the array
        const randomColor = copyCardColors[randomIndex];

        // remove the color to avoid the repetitive colors
        copyCardColors.splice(randomIndex, 1);

        // get the height according to the titles
        const height = 5 * title.length;


        // set progress bar animation
        let initialWidth;
        let animationDuration;

        if (isTimeBetween(startTime, endTime, time)) {

          // progress-bar animations
          initialWidth = calculateTimeRemainingInPercentage(startTime, endTime, time);

          // calculate time remaining (animation duration)
          animationDuration = calculateTimeRemainingInSeconds(startTime, endTime, time);

          // set animation duration
          setCSSVariable("pb-animation-duration", `${animationDuration}s`);

          // set initialWidth 
          setCSSVariable("start-width", `${initialWidth}%`)

        }

        // render subject data in screen
        screen.innerHTML += `
          <div class="card-container" style="min-height: ${height}rem; opacity: ${isTimePassed(endTime, time) ? "1" : "0.5"}">
            <div class="card-foreground">
              <div class="progress-bar" id="${isTimeBetween(startTime,endTime,time) && isTimePassed(endTime, time) ? "active-card" : ""}"></div>  
                <div class="subject-card-title-wrapper">
                  ${title.map((e) => { return `<h1 id="subject-card-title">${e}</h1>`;})
                    .join("")}
                </div>
                <div class="subject-card-time-wrapper">
                  <span id="subject-card-time">${startTime.replace(/\b(AM|PM)\b/gi, "")} - ${endTime.replace(/\b(AM|PM)\b/gi, "")}</span>
                </div>
            </div>
            <div class="card-background" style="--card-clr: ${randomColor};"></div>
          </div>`;
      }
    }
  }
}

// scroll to the top of the screen
function scrollToTop() {
  let screens = document.querySelectorAll(".screen")

  screens.forEach((screen) => {
    screen.scrollTo(0, 0);
  })
}

// set the css variable values
function setCSSVariable(variableName, variableValue) {
  document.documentElement.style.setProperty(`--${variableName}`, variableValue);
}