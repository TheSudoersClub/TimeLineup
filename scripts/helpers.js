function renderCurrentDayTime() {
  // Create new Date object
  const currentDate = new Date();

  // Get the current date and time
  const day = currentDate.toLocaleString("en-US", { weekday: "long" });
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
  return { day, time };
}

function editMenuToggleOn() {
  editMenu.classList.remove("toggle-off");
  editMenu.classList.add("toggle-on");
  editMenu.style = " display: flex";
}

function editMenuToggleOff() {
  editMenu.classList.remove("toggle-on");
  editMenu.classList.add("toggle-off");
}
