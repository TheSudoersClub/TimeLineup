window.addEventListener(
  "load",
  function () {
    setInterval(() => {
      const { day, time } = renderCurrentDayTime();
      // console.log(day);
      // console.log(time);

      let headerDay = document.getElementById("day");
      let headerTime = document.getElementById("time");

      headerDay.innerText = day;
      headerTime.innerText = time;
    });
  },
  60000
);
