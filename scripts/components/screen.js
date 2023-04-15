window.addEventListener("load", () => {

    // render screens
    renderScreens()

    // render subject Cards
    renderCards()

    // get the day and time
    const {
        day
    } = renderCurrentDayTime();

    // load the current day slide
    showSlide(day.toLowerCase());

});

// Defines a function to set up the screens in the carousel
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


    // change the opacity respective day
    const headerDay = document.getElementById("day");

    // get the day and time
    const {
        day
    } = renderCurrentDayTime();

    // highlight the screen and day
    if (headerDay.innerText === day) {
        document.getElementById(day.toLowerCase()).style.opacity = "1";
        headerDay.style.opacity = "1";
    }

    // disable the other days screens
    else {
        screens.forEach((screen) => {
            // set opacity of all screens to 0.5 except current day screen
            if (screen.id !== day.toLowerCase()) {
                console.log()
                screen.style.opacity = "0.5";
            }
        });
        headerDay.style.opacity = "0.5";
    }

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

// Get the container element and add a scroll event listener to it
const container = document.getElementById("container");
container.addEventListener("scroll", () => {
    // Call the setupScreens function whenever the container is scrolled
    setupScreens();
});