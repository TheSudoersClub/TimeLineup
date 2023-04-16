const updateJsonBtn = document.getElementById("choose-file")
// const updateJsonBtn = document.querySelector("input[type=file]")
updateJsonBtn.addEventListener("change", () => {
    const file = updateJsonBtn.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const jsonData = event.target.result;
        const data = JSON.parse(jsonData);
        localStorage.setItem('timeTableData', JSON.stringify(data));
        
        timeTableData = JSON.parse(localStorage.getItem("timeTableData"))

        // get the day and time
        const {
            day
        } = renderCurrentDayTime();

        // render screens
        renderScreens()

        // render subject Cards
        renderCards(offDays)

        // get the AllEndTimes array for current day
        getAllEndAndStartTimes(day, offDays);

        // set the opacity of all screen accordingly
        setScreenOpacity(day);

        // load the current day slide
        showSlide(day);

        // render current day and time cards accordingly
        checkDisableCards(day, offDays)
    };
    // console.log("adi")
    reader.readAsText(file)


})
