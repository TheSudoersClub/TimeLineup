// todo 
window.addEventListener("load", function() {
    setInterval(() => {
    const{day,time} = renderCurrentDateTime();
    console.log(day);
    console.log(time);

    let hederDay = this.document.getElementById("day");
    let hederDate = this.document.getElementById("date");

    hederDay.innerText = day;
    hederDate.innerText = time;
  });
  
},60000);