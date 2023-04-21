function downloadTemplate() {
  fetch('https://raw.githubusercontent.com/TheSudoersClub/TimeLineup/main/assets/template.json')
    .then(response => response.json())
    .then(data => {
      const jsonData = JSON.stringify(data, null, 2); // use 2 spaces for indentation
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => console.error(error));
}