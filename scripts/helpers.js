// day and time
function renderCurrentDateTime() {
    //  new Date object
    const currentDate = new Date();
  
    // Get the current date and time
    const day = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const time = `${hours}:${minutes}`;
    
//   return day & time 
    return {day,time}
    
  }
  
