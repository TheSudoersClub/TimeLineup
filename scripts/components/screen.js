
// load function
window.addEventListener("load", () => {
    // get the day and time
    const {
        day
    } = renderCurrentDayTime();
    console.log(day)

    // render screens
    renderScreens()

    // render subject Cards
    renderCards(offDays)

    // get the AllEndTimes array for current day
    getAllEndTimes(day, offDays);

    // set the opacity of all screen accordingly
    setScreenOpacity(day);

    // load the current day slide
    showSlide(day);

    // render current day and time cards accordingly
    checkDisableCards(day, offDays)

    // rerender all cards for the any endTime trigger
    setInterval(() => {
        const {
            time
        } = renderCurrentDayTime();

        // rerender the cards if one lecture or card time have been end
        if (allEndTimes.includes(time)) {
            for (let i = allEndTimes.length - 1; i >= 0; i--) {
                if (allEndTimes[i] === time) {
                    allEndTimes.splice(i, 1);
                }
            }
            checkDisableCards(day, offDays);
        }
    }, 2000);

});

// Get the container element and add a scroll event listener to it
const container = document.getElementById("container");
container.addEventListener("scroll", () => {
    // Call the setupScreens function whenever the container is scrolled
    setupScreens();
});

// Defines a function to set up the screens 
function setupScreens() {

    // Get the container and all the screens
    const container = document.getElementById("container");
    const screens = document.querySelectorAll(".screen");

    // Define an observer that detects when a screen enters the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.5) {
                document.getElementById("day").innerHTML = entry.target.id;
            }
        });
    });

    // Observe each screen
    screens.forEach((screen) => {
        observer.observe(screen);
    });

    // Add touch event listeners to the container
    container.addEventListener("touchstart", handleTouchStart, false);
    container.addEventListener("touchmove", handleTouchMove, false);

    // Define variables to store touch coordinates
    let xDown = null;
    let yDown = null;

    // Define function to handle touch start events
    function handleTouchStart(event) {
        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
    }

    // Define function to handle touch move events
    function handleTouchMove(event) {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                container.scrollBy({
                    right: container.offsetWidth,
                    behavior: "smooth"
                });
            } else {
                container.scrollBy({
                    right: -container.offsetWidth,
                    behavior: "smooth"
                });
            }
        }

        xDown = null;
        yDown = null;
    }

    // get the day and time
    const {
        day
    } = renderCurrentDayTime();

    // setup the screens opacity accordingly
    setScreenOpacity(day);

    // scroll to top
    scrollToTop();

}

// Define a variable to keep track of whether the initial slide has been displayed
let initialSlideDisplayed = false;

// Define a function to show a specific slide
function showSlide(slideId) {
    const container = document.getElementById('container');
    const slide = document.getElementById(slideId);
    const slides = container.querySelectorAll('.screen');

    // Hide all other slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
    }


    // Show the selected slide
    slide.classList.remove('hidden');

    // If this is the first slide being displayed, snap to it
    if (!initialSlideDisplayed) {
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = slide.offsetLeft;
        container.style.scrollBehavior = 'smooth';
        initialSlideDisplayed = true;
    }
    // Otherwise, smoothly scroll to it
    else {
        container.scroll({
            left: slide.offsetLeft,
            behavior: 'auto'
        });
    }

    // unhide all other slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('hidden');
    }
}

// set the opacity of the screens accordingly
function setScreenOpacity(day) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
        // set opacity of all screens to 0.5 except current day screen
        if (screen.id !== day) {
            console.log()
            screen.style.opacity = "0.5";
        }
    });

    // change the opacity respective day header
    const headerDay = document.getElementById("day");

    // highlight the screen and day
    if (headerDay.innerHTML === day) {
        document.getElementById(day).style.opacity = "1";
        headerDay.style.opacity = "1";
    } else {
        headerDay.style.opacity = "0.5";
    }

}