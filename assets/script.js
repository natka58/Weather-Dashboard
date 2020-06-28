$(document).ready(function() {
  console.log("ready");
})
fetch(
    'http://api.openweathermap.org/data/2.5/weather?q={cityname}&appid=e5277dcd0f9699778995e6a15411d5e9'
  )
    // Converts the response to JSON
    .then(function(data) {
      return data.json(); 
    })

    .then(function(data) {
        console.log(data)
        var container = document.querySelector('#response-container')
       
       
    });
