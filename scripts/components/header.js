window.addEventListener("load", () => {

  let headerDay = document.getElementById("day");
  let headerTime = document.getElementById("time");

  // get the day and time
  const {
    day,
    time
  } = renderCurrentDayTime();

  // render day and time onload
  headerTime.innerText = time;
  headerDay.innerText = day;

  // rerender time for every minute
  setInterval(() => {
    // get the day and time

    const {
      day,
      time
    } = renderCurrentDayTime();

    // render time
    headerTime.innerText = time;
  }, 60000);

});