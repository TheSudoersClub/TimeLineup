const editIcon = document.querySelector(".edit-icon");
const editMenu = document.querySelector(".edit-menu");
let menuToggle = false;

editIcon.addEventListener("click", () => {
    if (menuToggle === false) {
        editMenu.classList.remove("toggle-off");
        editMenu.classList.add("toggle-on");
        editMenu.style = " display: flex";
    }
    else {
        editMenu.classList.remove("toggle-on");
        editMenu.classList.add("toggle-off");
    }



    menuToggle = !menuToggle;
})

