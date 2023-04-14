const editIcon = document.querySelector(".edit-icon");
const editIconImg = document.querySelector("#edit-icon-img");
const editMenu = document.querySelector(".edit-menu");
const mainContainer = document.getElementById("main");
const updateJSONBtn = document.getElementById('update-json-btn')
const downloadTemplateBtn = document.getElementById('download-template-btn');
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

document.addEventListener("click", function (e) {
    console.log(e.target);
    if (e.target != editIconImg && !editMenu.contains(e.target)) {
        editMenuToggleOff();
        menuToggle = !menuToggle;
    }
});
