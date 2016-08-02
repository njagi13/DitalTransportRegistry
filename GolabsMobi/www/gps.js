/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
var gpsPosition = null;
    $(document).on("click", "#locationBtn", function()
    { 
  navigator.geolocation.getCurrentPosition(onSuccess,onError);
  });
    
    var onSuccess = function(position) {       
   gpsPosition = position;
            document.getElementById("latitude").innerHTML ="Latitude:"+" "+ position.coords.latitude ;
          document.getElementById("longitude").innerHTML ="Longitude:"+" "+ position.coords.longitude ;
         document.getElementById("altitude").innerHTML ="Altitude:"+" "+ position.coords.altitude ;
        document.getElementById("speed").innerHTML ="Speed:"+" "+ position.coords.speed ;
};

    function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
    
})();