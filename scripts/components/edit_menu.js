const editIcon = document.querySelector(".edit-icon");
const editMenu = document.querySelector(".edit-menu");
let menuToggle = false;

editIcon.addEventListener("click", () => {
    if (menuToggle === false) {
        editMenu.style = " display: flex";
        menuToggle = true;
    }
    else {
        editMenu.style = " display: none";
        menuToggle = false;
    }

})

