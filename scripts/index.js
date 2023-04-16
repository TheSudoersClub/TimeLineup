// get all end times array of current day
let allEndTimes = [];

// get all Start times array of current day
let allStartTimes = [];

// off days array 
let offDays = ["sunday"]

let timeTableData = {}

window.addEventListener("load", () => {

    // load the timeTableData from json
    timeTableData = JSON.parse(localStorage.getItem("timeTableData"))
})