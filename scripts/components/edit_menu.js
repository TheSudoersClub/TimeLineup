const editIcon = document.querySelector(".edit-icon");
const editIconImg = document.querySelector("#edit-icon-img");
const editMenu = document.querySelector(".edit-menu");
const mainContainer = document.getElementById("main");
let menuToggle = false;

// handle edit-icon onClick
editIcon.addEventListener("click", () => {
  if (!menuToggle) {
    editMenuToggleOn();
  } else {
    editMenuToggleOff();
  }

  menuToggle = !menuToggle;
});

document.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target != editIconImg) {
    console.log("hello");
    editMenuToggleOff();
    menuToggle = !menuToggle;
  }
});
