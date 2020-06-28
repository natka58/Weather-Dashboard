//API KEY e5277dcd0f9699778995e6a15411d5e9

function search(city) {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e5277dcd0f9699778995e6a15411d5e9";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (result) {

    $("#city").text(result.name);
    $("#date").text(date);
    $("#icon").attr("src", "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png");
    $("#temp").text("Tempature: " + result.main.temp + " F");
    $("#hmdt").text("Humidity: " + result.main.humidity + "%");
    $("#wind").text("Wind Speed: " + result.wind.speed + " MPH");

    var lat = result.coord.lat;
    var lon = result.coord.lon;
    populateUVIndex(lon, lat);



    function populateUVIndex(lon, lat) {
      var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e5277dcd0f9699778995e6a15411d5e9&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (data) {
        
        var UVIndex = data.value;
        var currUVLevel = $("#uv").attr("data-uv-level");
     
        $("#uv").removeClass(currUVLevel);
        $("#uv").text(UVIndex);
        $("#uv").text("UV Index: " + data.value);
        if (UVIndex < 3) {
          $("#uv").attr("data-uv-level", "uv-low");
        } else if (UVIndex < 6) {
          $("#uv").attr("data-uv-level", "uv-mod");
        } else if (UVIndex < 8) {
          $("#uv").attr("data-uv-level", "uv-high");
        } else if (UVIndex < 11) {
          $("#uv").attr("data-uv-level", "uv-very-high");
        } else {
          $("#uv").attr("data-uv-level", "uv-ext");
        }
        $("#uv").addClass($("#uv").attr("data-uv-level"));
        
      });
    }
  });

  var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",usa&units=imperial&appid=e5277dcd0f9699778995e6a15411d5e9";

  $.ajax({
    url: forcastURL,
    method: "GET"
  }).then(function (info) {
    // forcast day 1
    $("#date-1").text(date1);
    $("#temp-1").text("Tempature: " + info.list[3].main.temp + " F");
    $("#icon-1").attr("src", "http://openweathermap.org/img/wn/" + info.list[3].weather[0].icon + ".png");
    $("#hmdt-1").text("Humidity: " + info.list[3].main.humidity + "%");
    // focast day 2
    $("#date-2").text(date2);
    $("#temp-2").text("Tempature: " + info.list[11].main.temp + " F");
    $("#icon-2").attr("src", "http://openweathermap.org/img/wn/" + info.list[11].weather[0].icon + ".png");
    $("#hmdt-2").text("Humidity: " + info.list[11].main.humidity + "%");
    // forcast day 3
    $("#date-3").text(date3);
    $("#temp-3").text("Tempature: " + info.list[19].main.temp + " F");
    $("#icon-3").attr("src", "http://openweathermap.org/img/wn/" + info.list[19].weather[0].icon + ".png");
    $("#hmdt-3").text("Humidity: " + info.list[19].main.humidity + "%");
    // forcast day 4
    $("#date-4").text(date4);
    $("#temp-4").text("Tempature: " + info.list[27].main.temp + " F");
    $("#icon-4").attr("src", "http://openweathermap.org/img/wn/" + info.list[27].weather[0].icon + ".png");
    $("#hmdt-4").text("Humidity: " + info.list[27].main.humidity + "%");
    // forcast day 5
    $("#date-5").text(date5);
    $("#temp-5").text("Tempature: " + info.list[35].main.temp + " F");
    $("#icon-5").attr("src", "http://openweathermap.org/img/wn/" + info.list[35].weather[0].icon + ".png");
    $("#hmdt-5").text("Humidity: " + info.list[35].main.humidity + "%");

  });

  var date = moment().format("(M/D/YYYY)");
  var date1 = moment().add(1, "day").format("(M/D/YYYY)");
  var date2 = moment().add(2, "day").format("(M/D/YYYY)");
  var date3 = moment().add(3, "day").format("(M/D/YYYY)");
  var date4 = moment().add(4, "day").format("(M/D/YYYY)");
  var date5 = moment().add(5, "day").format("(M/D/YYYY)");
};
var cities = [];

$("#searchCity").on("click", function (event) {
  event.preventDefault();

  var City = $("#City").val().trim();
  cities.push(City);

  search(City);

  buttons();
});

function buttons() {
  $("#buttons-view").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<li>");
    a.addClass("btn btn-primary");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);

    $("#buttons-view").append(a);
  }
}

$(document).on("click", ".btn btn-primary", search);

buttons();
