const editIcon = document.querySelector(".edit-icon");
const editMenu = document.querySelector(".edit-menu");
let menuToggle = false;

editIcon.addEventListener("click", () => {
    if (menuToggle === false) {
        editMenu.classList.toggle("toggle-on");
        editMenu.style = " display: flex";
        menuToggle = true;
    }
    else {
        editMenu.classList.toggle("toggle-off");
        menuToggle = false;
    }
})

