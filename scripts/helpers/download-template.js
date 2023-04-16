// Get a reference to the download button element
const downloadBtn = document.querySelectorAll('.download-template-btn');

downloadBtn.forEach(element => {
    // Add a click event listener to the download button
    element.addEventListener('click', () => {

        // Set the URL of the file you want to download
        const fileUrl = "./assets/template.json";

        // Set the name that you want the downloaded file to have
        const fileName = 'template.json';

        // Fetch the file contents as a blob
        fetch(fileUrl)
            .then(response => response.blob()) // get the response as a blob
            .then(blob => {

                // Create a new download link element
                const downloadLink = document.createElement('a');

                // Set the href attribute of the download link to a URL created from the blob
                downloadLink.href = window.URL.createObjectURL(blob);

                // Set the download attribute of the download link to the desired file name
                downloadLink.download = fileName;

                // Append the download link to the document body
                document.body.appendChild(downloadLink);

                // Trigger a click event on the download link
                downloadLink.click();

                // Remove the download link from the document body
                document.body.removeChild(downloadLink);

            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    });
});