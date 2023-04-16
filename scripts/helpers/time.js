// get the all lecture ending Times in an array
function getAllEndTimes(day, offDays) {
  // exit if the day is in offDays array
  if (offDays.includes(day)) {
    return
  };

  // loop through subjects
  for (const subject in timeTableData[day]) {
    if (timeTableData[day].hasOwnProperty(subject)) {

      // get the subject's object wrt day
      const subjectObject = timeTableData[day][subject];

      // lecture ending time
      const endTime = subjectObject.time.end;

      // add the endTime to the array
      allEndTimes.push(endTime)

    }
  }
}

// increment the given time by one minute
function incrementTimeByOneMinute(timeString) {
  if (timeString == "12:59 PM") {
    return "01:00 PM";
  } else if (timeString == "12:59 AM") {
    return "01:00 AM";
  }

  // Parse the input time string to extract the hours, minutes, and meridian (AM/PM)
  let [hours, minutes, meridian] = timeString.split(/:|\s/);

  // Convert hours to 24-hour format for easier manipulation
  let hours24 = parseInt(hours, 10);
  if (meridian === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (meridian === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  // Convert minutes to number and add 1
  let minutesNum = parseInt(minutes, 10);
  minutesNum += 1;

  // If minutes exceed 59, carry over to hours and subtract 60 minutes
  if (minutesNum > 59) {
    hours24 += 1;
    minutesNum -= 60;
  }

  // Handle the "12:00" case by adjusting the hour and meridian
  if (hours24 === 12 && minutes === "59" && meridian === "AM") {
    meridian = "PM";
  } else if (hours24 === 12 && minutes === "59" && meridian === "PM") {
    meridian = "AM";
  } else if (hours24 === 24 && minutes === "59") {
    hours24 = 0;
  }

  // Convert hours back to 12-hour format and adjust meridian if necessary
  let hours12 = hours24 % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }
  const newMeridian = hours24 < 12 ? "AM" : "PM";

  // Format the new time string and return it
  const newTimeString = `${hours12.toString().padStart(2, "0")}:${minutesNum
    .toString()
    .padStart(2, "0")} ${newMeridian}`;

  return newTimeString;
}

// calculate the duration between two times
function calculateDuration(start, end) {

  const startDate = new Date("2000/01/01 " + start);
  const endDate = new Date("2000/01/01 " + end);

  const diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes
  }

}

// check weather the current time is between start and end time
function isTimeBetween(start, end, timeToCheck) {
  const startDate = new Date("2000/01/01 " + start);
  const endDate = new Date("2000/01/01 " + end);
  const time = new Date("2000/01/01 " + timeToCheck);

  return time.getTime() >= startDate.getTime() && time.getTime() <= endDate.getTime();
}