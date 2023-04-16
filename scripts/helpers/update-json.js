const updateJsonBtn = document.getElementById("choose-file")

// trigger when the user selects the file
updateJsonBtn.addEventListener("change", () => {
    const file = updateJsonBtn.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const jsonData = event.target.result;

        // check for correct JSON format
        let data;
        try {
            data = JSON.parse(jsonData);

        } catch (error) {
            console.error(error)
            return
        }

        // reset old timeTableData
        localStorage.removeItem(("timeTableData"));
        
        // set the data to the localStorage
        localStorage.setItem('timeTableData', JSON.stringify(data));

        // set timeTableData from localstorage
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
    reader.readAsText(file)
})