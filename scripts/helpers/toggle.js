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