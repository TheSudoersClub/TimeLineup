window.addEventListener("load", () => {
    // check for updates
    if (navigator.onLine) {
        //check for internet connection
        checkForUpdates().then((result) => {
            if (result) {
                //update is available
                //display update Dialog box
                let frame = document.querySelector("#main");
                let updateContainer = document.querySelector("#update-container");
                frame.style.filter = "blur(2px)";
                updateContainer.style.display = "flex";
                frame.addEventListener("click", function (e) {
                    frame.style.filter = "";
                    updateContainer.style.display = "none";
                });

                //handle update-btn onclick
                document
                    .querySelector("#update-btn")
                    .addEventListener("click", function (e) {
                        window.open(
                            "https://github.com/TheSudoersClub/TimeLineup/blob/main/dist/apk/TimeLineup.apk?raw=true"
                        );
                    });
            }
        });
    }
});

async function checkForUpdates() {
    let version = await getVersion(
        "https://thesudoersclub.github.io/TimeLineup/dist/version.txt"
    );


    if (localStorage.getItem("version") == null) {
        localStorage.setItem("version", `${version}`);
    }

    let localVersion = localStorage.getItem("version");
    if (version !== localVersion) {
        // update available
        return true;
    } else {
        // app is upto date
        return false;
    }
}

async function getVersion(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not retrieve file: ${response.statusText}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}